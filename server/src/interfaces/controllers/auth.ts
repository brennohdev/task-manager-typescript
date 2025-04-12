import { asyncHandler } from '../../infrastructure/middlewares/asyncHandler';
import { NextFunction, Request, response, Response } from 'express';
import { config } from '../../infrastructure/config/app';
import { registerSchema } from '../validations/auth';
import { HTTPSTATUS } from '../../infrastructure/config/http';
import { signUpUser } from '../../application/services/auth';
import passport from 'passport';
import { errorHandler } from '../../infrastructure/middlewares/errorHandler';
import { error } from 'console';

interface CustomUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
  currentWorkspace?: string;
}

interface CustomRequest extends Request {
  user?: CustomUser;
}

export const googleLoginCallback = asyncHandler(async (req: CustomRequest, res: Response) => {
  const currentWorkspace = req.user?.currentWorkspace;

  if (!currentWorkspace) {
    return res.redirect(`${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`);
  }

  return res.redirect(`${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`);
});

export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse({
    ...req.body,
  });

  await signUpUser(body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: 'User created successfully',
  });
});

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      'local',
      (err: Error | null, user: Express.User | false, info: { message: string } | undefined) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(HTTPSTATUS.UNAUTHORIZED).json({
            message: info?.message || 'Invalid email or password.',
          });
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.status(HTTPSTATUS.OK).json({
            message: 'Logged in successfully',
            user,
          });
        });
      },
    )(req, res, next);
  },
);

export const logOutController = asyncHandler(async (req: Request, res: Response) => {
  req.logOut((err) => {
    if (err) {
      console.error('Logout error', err);
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to log out' });
    }
  });

  req.session = null;
  return res.status(HTTPSTATUS.OK).json({ message: 'Successfully Logged out' });
});

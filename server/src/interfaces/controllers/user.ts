import { fetchCurrentUser } from '../../application/services/user';
import { HTTPSTATUS } from '../../infrastructure/config/http';
import { asyncHandler } from '../../infrastructure/middlewares/asyncHandler';
import { Request, Response } from 'express';

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  const { user } = await fetchCurrentUser(req.user.id);

  return res.status(HTTPSTATUS.OK).json({
    message: 'User fetched successfully',
    user,
  });
});

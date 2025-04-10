import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import session from 'cookie-session';
import { config } from './infrastructure/config/app';
import connectDataBase from './infrastructure/config/dataBase';
import { HTTPSTATUS } from './infrastructure/config/http';
import { errorHandler } from './infrastructure/middlewares/errorHandler';
import { asyncHandler } from './infrastructure/middlewares/asyncHandler';
import { BadRequestException } from './shared/utils/appError';
import { ErrorCodeEnum } from './domain/enums/errorCode';

import "./infrastructure/config/passport"
import passport from 'passport';
import authRoute from './interfaces/routes/auth';

const app = express();
const BASE_PATH = config.BASE_PATH // Using the config from app.config.ts

app.use(express.json());

// Allow to access the body of the request form
app.use(express.urlencoded({ extended: true })); 
/* Like: <form method="POST" action="/login">
    <input name="email" />
    <input name="password" />
</form>

req.body.email
req.body.password

req.body = {
    user: {
    name: "João",
    age: 30
    }
}
*/

app.use(
    session({
        name: 'session',
        keys: [config.SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax'
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true, // Allow cookies to be sent with requests
}));

app.get('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("This is a bad request", ErrorCodeEnum.AUTH_INVALID_TOKEN);
    res.status(HTTPSTATUS.OK).json({
        message: "Hello!!"
        });
    })
);

app.use(`${BASE_PATH}/auth`, authRoute)

app.use(errorHandler)

app.listen(config.PORT, async () => {
    console.log(`Server is running on port ${config.PORT} in ${config.NODE_ENV}`);
    await connectDataBase();
});






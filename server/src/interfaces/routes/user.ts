import { Router } from 'express';
import { getCurrentUser } from '../controllers/user';

const userRoute = Router();

userRoute.get('/current', getCurrentUser);

export default userRoute;

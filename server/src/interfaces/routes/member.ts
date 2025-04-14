import { Router } from 'express';
import { joinWorkspace } from '../controllers/member';

const memberRoute = Router();

memberRoute.post("/workspace/:inviteCode/join", joinWorkspace);

export default memberRoute;
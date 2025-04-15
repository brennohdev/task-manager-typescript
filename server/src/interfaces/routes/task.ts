import { Router } from "express";
import { createTaskController } from "../controllers/task";

const taskRoute = Router();

taskRoute.post("/project/:projectId/workspace/:workspaceId/create", createTaskController);



export default taskRoute;
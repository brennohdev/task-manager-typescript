import { ClientSession } from "mongoose";
import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../../infrastructure/database/repositories/task";

export const createTaskUseCase = async (taskEntity: Task, session?: ClientSession) => {
    const taskRepo = new TaskRepository();
    return await taskRepo.create(taskEntity);
  };
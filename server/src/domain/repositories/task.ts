import { Task } from "../entities/Task";
import { Types } from "mongoose";

export interface ITaskRepository {
    create(task: Omit<Task, "id">): Promise<Task>;
    findById(id: Types.ObjectId): Promise<Task | null>;
    findByProject(projectId: Types.ObjectId): Promise<Task[]>;
    findByWorkspace(workspaceId: Types.ObjectId): Promise<Task[]>;
    update(task: Task): Promise<void>;
    delete(id: Types.ObjectId): Promise<void>;
}

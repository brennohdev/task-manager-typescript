import { Types } from "mongoose";
import { TaskRepository } from "../../../infrastructure/database/repositories/task";

export const getWorkspaceAnalytics = async(workspaceid: string) => {
    const taskRepository = new TaskRepository();
    const currentDate = new Date();

    const countTotalTasks =  await taskRepository.countTotalTasks(new Types.ObjectId(workspaceid));
    const countOverdueTasks = await taskRepository.countOverdueTasks(new Types.ObjectId(workspaceid), currentDate);
    const countCompletedTasks = await taskRepository.countCompletedTasks(new Types.ObjectId(workspaceid));

    const analytics = {
        countTotalTasks,
        countOverdueTasks,
        countCompletedTasks
    };

    return { analytics };
};
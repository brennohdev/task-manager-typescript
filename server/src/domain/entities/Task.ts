import { Types } from 'mongoose';
import { TaskPriorityEnumType } from '../enums/taskStatus';
import { TaskStatusEnumType } from '../enums/taskStatus';

export class Task {
  constructor(
    public taskCode: string,
    public title: string,
    public description: string | null,
    public project: Types.ObjectId,
    public workspace: Types.ObjectId,
    public status: TaskStatusEnumType,
    public priority: TaskPriorityEnumType,
    public assignedTo: Types.ObjectId | null,
    public createdBy: Types.ObjectId,
    public dueDate: Date | null,
    public createdAt?: Date,
    public updatedAt?: Date,
    public id?: Types.ObjectId,
  ) {}
}

import { Types } from 'mongoose';

export class Project {
  constructor(
    public name: string,
    public description: string | null,
    public emoji: string,
    public workspace: Types.ObjectId,
    public createdBy: Types.ObjectId,
    public createdAt?: Date,
    public updatedAt?: Date,
    public id?: Types.ObjectId,
  ) {}
}

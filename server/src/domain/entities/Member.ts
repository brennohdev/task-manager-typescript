import { Types } from "mongoose";

export class Member {
    constructor(
    public userId: Types.ObjectId,
    public workspaceId: Types.ObjectId,
    public joinedAt: Date,
    public id?: Types.ObjectId
    ) {}
}

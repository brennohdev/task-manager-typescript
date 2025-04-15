import { Types } from "mongoose";
import MemberModel from "../../../infrastructure/database/models/member";
import { NotFoundException } from "../../../shared/utils/appError";

export const ensureUserIsMemberOfWorkspace = async (
  workspaceId: string,
  userId: string
) => {
  const isMember = await MemberModel.exists({
    workspace: new Types.ObjectId(workspaceId),
    user: new Types.ObjectId(userId),
  });

  if (!isMember) {
    throw new NotFoundException("User is not a member of this workspace");
  }
};

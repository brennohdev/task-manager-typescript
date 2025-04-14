import { WorkspaceRepository } from "../../../infrastructure/database/repositories/workspace";
import { MemberRepository } from "../../../infrastructure/database/repositories/member";
import { NotFoundException, UnauthorizedException } from "../../../shared/utils/appError";

export const getAccessLevelInWorkspace = async (
  userId: string,
  workspaceId: string,
): Promise<"owner" | "member"> => {
  const workspaceRepository = new WorkspaceRepository();
  const memberRepository = new MemberRepository();

  const workspace = await workspaceRepository.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  if (workspace.owner === userId) {
    return "owner";
  }

  const member = await memberRepository.findByUserIdAndWorkspaceId(userId, workspaceId);
  if (!member) {
    throw new UnauthorizedException("User is not a member of this workspace");
  }

  return "member";
};
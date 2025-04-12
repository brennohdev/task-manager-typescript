import { ErrorCodeEnum } from '../../../domain/enums/errorCode';
import { MemberRepository } from '../../../infrastructure/database/repositories/member';
import { UnauthorizedException } from '../../../shared/utils/appError';

export const checkUserMembershipInWorkspace = async (
  userId: string,
  workspaceId: string,
): Promise<boolean> => {
  const memberRepository = new MemberRepository();

  const member = await memberRepository.findByUserIdAndWorkspaceId(userId, workspaceId);

  if (!member) {
    throw new UnauthorizedException(
        'User is not a member of this workspace.',
        ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }

  return true;
};

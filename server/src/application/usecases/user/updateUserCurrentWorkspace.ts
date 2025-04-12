import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../infrastructure/database/repositories/user';

export const updateUserCurrentWorkspace = async (
  user: User,
  workspaceId: string,
  userRepository: UserRepository,
  session?: any,
) => {
  user.currentWorkspace = workspaceId;
  return userRepository.update(user.id!, user, session);
};

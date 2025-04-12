import { UserRepository } from '../../infrastructure/database/repositories/user';
import { BadRequestException } from '../../shared/utils/appError';

export const fetchCurrentUser = async (userId: string) => {
  const userRepository = new UserRepository();
  const user = await userRepository.findByIdWithWorkspace(userId);

  if (!user) {
    throw new BadRequestException('User not found.');
  }

  return { user };
};

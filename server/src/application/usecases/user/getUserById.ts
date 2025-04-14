import { UserRepository } from '../../../infrastructure/database/repositories/user';
import { NotFoundException } from '../../../shared/utils/appError';

export const getUserById = async (userId: string) => {
  const userRepository = new UserRepository();
  const user = userRepository.findById(userId);

  if (!user) {
    throw new NotFoundException('User not found.');
  }

  return user;
};

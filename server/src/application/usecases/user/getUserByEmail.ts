import { UserRepository } from '../../../infrastructure/database/repositories/user';

export const getUserByEmail = async (email: string, userRepository: UserRepository) => {
  return userRepository.findByEmail(email);
};

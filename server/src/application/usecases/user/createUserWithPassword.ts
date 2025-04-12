import { UserRepository } from '../../../infrastructure/database/repositories/user';

export const createUserWithPassword = async (
  data: { name: string; email: string; password: string },
  userRepository: UserRepository,
  session?: any,
) => {
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new Error('Email already exists');
  }

  return userRepository.createWithPassword(data, session);
};

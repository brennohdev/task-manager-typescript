import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../infrastructure/database/repositories/user';

export const createUserProvider = async (
  name: string,
  email: string,
  picture: string | null,
  userRepository: UserRepository,
  session?: any,
) => {
  const user = User.createNewUser(name, email, picture);
  return userRepository.create(user, session);
};

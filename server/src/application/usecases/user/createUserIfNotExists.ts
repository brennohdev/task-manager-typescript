import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../infrastructure/database/repositories/user';

export const createUserIfNotExists = async (
  email: string,
  name: string,
  picture: string | null,
  userRepository: UserRepository,
  session?: any,
) => {
  let user = await userRepository.findByEmail(email);
  if (!user) {
    const newUser = new User(name, email, picture);
    user = await userRepository.create(newUser, session);
  }

  return user;
};

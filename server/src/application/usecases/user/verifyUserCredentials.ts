import { IUserRepository } from '../../../domain/repositories/user';

type VerifyUserCredentialsInput = {
  email: string;
  password: string;
};

export async function verifyUserCredentials(
  input: VerifyUserCredentialsInput,
  userRepository: IUserRepository,
) {
  const { email, password } = input;

  const userDoc = await userRepository.findUserWithPasswordByEmail(email);
  if (!userDoc) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await userDoc.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const userEntity = await userRepository.findById(userDoc.id.toString());
  if (!userEntity) {
    throw new Error('User not found after login');
  }

  return userEntity;
}

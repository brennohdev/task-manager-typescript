// services/authService.ts
import mongoose, { Types } from 'mongoose';
import { ProviderEnum } from '../../domain/enums/accountProvider';

import { AccountRepository } from '../../infrastructure/database/repositories/account';
import { UserRepository } from '../../infrastructure/database/repositories/user';
import { WorkspaceRepository } from '../../infrastructure/database/repositories/workspace';
import { MemberRepository } from '../../infrastructure/database/repositories/member';

import { createUserWithPassword } from '../usecases/user/createUserWithPassword';
import { createUserProvider } from '../usecases/user/createUserFromProvider';
import { registerAccount } from '../usecases/account/registerAccount';
import {  createWorkspaceForUserSignUp } from '../usecases/workspace/createWorkspaceForUserSignup';
import { updateUserCurrentWorkspace } from '../usecases/user/updateUserCurrentWorkspace';
import { addMemberToWorkspace } from '../usecases/member/addMemberToWorkspace';
import { verifyUserCredentials } from '../usecases/user/verifyUserCredentials';
import { User } from '../../domain/entities/User';

export const signUpUser = async (body: { email: string; name: string; password: string }) => {
  const session = await mongoose.startSession();
  const { email, name, password } = body;

  try {
    session.startTransaction();

    const userRepository = new UserRepository();
    const accountRepository = new AccountRepository();
    const workspaceRepository = new WorkspaceRepository();
    const memberRepository = new MemberRepository();

    const user = await createUserWithPassword({ name, email, password }, userRepository, session);
    await registerAccount(
      ProviderEnum.EMAIL,
      email,
      user.id!,
      accountRepository,
      undefined,
      session,
    );

    const workspace = await createWorkspaceForUserSignUp(
      user.id!,
      user.name,
      workspaceRepository,
      session,
    );

    if (!Types.ObjectId.isValid(workspace.id!)) {
      throw new Error('Invalid workspace ID');
    }

    await updateUserCurrentWorkspace(user, workspace.id!, userRepository, session);
    await addMemberToWorkspace(user.id!, workspace.id!, memberRepository, session);

    await session.commitTransaction();
    session.endSession();

    return { user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


export const processUserAccountFlow = async (data: {
  provider: keyof typeof ProviderEnum;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}) => {
  const session = await mongoose.startSession();
  const { provider, providerId, displayName, email = '', picture = null } = data;

  try {
    session.startTransaction();

    const userRepository = new UserRepository();
    const accountRepository = new AccountRepository();
    const workspaceRepository = new WorkspaceRepository();
    const memberRepository = new MemberRepository();

    // ⛔️ Verifica se já existe uma Account com esse providerId (login ao invés de criar)
    const existingAccount = await accountRepository.findByProviderId(providerId);

    if (existingAccount) {
      // Se já existir, retorna o usuário vinculado
      const user = await userRepository.findById(existingAccount.userId.toString());
      await session.endSession(); // não precisa de commit
      return { user };
    }

    // Caso contrário, segue com o fluxo normal de criação
    let user = await userRepository.findByEmail(email);

    if (!user) {
      user = await createUserProvider(displayName, email, picture, userRepository, session);
      const workspace = await createWorkspaceForUserSignUp(
        user.id!.toString(), // Converte para string aqui
        user.name,
        workspaceRepository,
        session,
      );
      await updateUserCurrentWorkspace(user, workspace.id!, userRepository, session);
      await addMemberToWorkspace(user.id!.toString(), workspace.id!, memberRepository, session);
    }

    await registerAccount(provider, providerId, user.id!.toString(), accountRepository, picture, session); // Converte para string aqui

    await session.commitTransaction();
    session.endSession();

    return { user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const verifyService = async (input: { email: string; password: string }): Promise<User> => {
  const userRepository = new UserRepository();
  return verifyUserCredentials(input, userRepository);
};

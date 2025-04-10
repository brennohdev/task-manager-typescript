import mongoose, { Types } from "mongoose";
import { User } from "../../domain/entities/User";
import { Account } from "../../domain/entities/Account";
import { Workspace } from "../../domain/entities/Workspace";
import { Member } from "../../domain/entities/Member";
import { ProviderEnum } from "../../domain/enums/accountProvider";

import { AccountRepository } from "../../infrastructure/database/repositories/account";
import { UserRepository } from "../../infrastructure/database/repositories/user";
import { WorkspaceRepository } from "../../infrastructure/database/repositories/workspace";
import { MemberRepository } from "../../infrastructure/database/repositories/member";

import { generateInviteCode } from "../../shared/utils/generateInviteCode";
import { BadRequestException } from "../../shared/utils/appError";

export const processUserAccountFlow = async (data: {
  provider: keyof typeof ProviderEnum;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}) => {
  const { providerId, provider, displayName, email, picture } = data;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userRepository = new UserRepository();
    const accountRepository = new AccountRepository();
    const workspaceRepository = new WorkspaceRepository();
    const memberRepository = new MemberRepository();

    let user = await userRepository.findByEmail(email || "");

    if (!user) {
      user = new User(displayName, email || "", picture || null);
      user = await userRepository.create(user, session);

      const workspace = new Workspace(
        "My Workspace",
        `Workspace created for ${user.name}`,
        user.id!,
        generateInviteCode()
      );
      const createdWorkspace = await workspaceRepository.create(workspace, session);

      user.currentWorkspace = createdWorkspace.id!;
      await userRepository.update(user.id!, user, session);

      const member = new Member(
        new Types.ObjectId(user.id!),
        new Types.ObjectId(createdWorkspace.id!),
        new Date()
      );
      await memberRepository.add(member, session);
    }

    const existingAccount = await accountRepository.findByProviderId(providerId);
    if (!existingAccount) {
      const account = new Account(provider, providerId, user.id!, picture);
      await accountRepository.create(account, session);
    }

    await session.commitTransaction();
    session.endSession();

    return { user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const signUpUser = async (body: {
  email: string,
  name: string,
  password: string,
}) => {
  const { email, name, password } = body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userRepository = new UserRepository();
    const accountRepository = new AccountRepository();
    const workspaceRepository = new WorkspaceRepository();
    const memberRepository = new MemberRepository();

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    const user = await userRepository.createWithPassword({
      name,
      email,
      password,
    }, session);

    const account = new Account(
      ProviderEnum.EMAIL,
      email,
      user.id!,
    );
    await accountRepository.create(account, session);

    const workspace = new Workspace(
      "My Workspace",
      `Workspace created for ${user.name}`,
      user.id!,
      generateInviteCode()
    );
    const createdWorkspace = await workspaceRepository.create(workspace, session);

    user.currentWorkspace = createdWorkspace.id!;
    await userRepository.update(user.id!, user, session);

    const member = new Member(
      new Types.ObjectId(user.id!),
      new Types.ObjectId(createdWorkspace.id!),
      new Date()
    );
    await memberRepository.add(member, session);

    await session.commitTransaction();
    session.endSession();

    return { user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

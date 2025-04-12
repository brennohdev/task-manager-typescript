import mongoose from 'mongoose';
import { User } from '../entities/User';
import { UserDocument } from '../../infrastructure/database/models/user';
import { ClientSession } from 'mongoose';

export interface IUserRepository {
  create(userData: Omit<User, 'id'>, session?: mongoose.ClientSession): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateLastLogin(id: string, date: Date): Promise<void>;
  update(id: string, user: User, session?: mongoose.ClientSession): Promise<User>;
  queryUser(query: Record<string, unknown>): Promise<User | undefined>;
  findUserWithPasswordByEmail(email: string): Promise<UserDocument | null>;
  updateCurrentWorkspace(
    userId: string,
    workspaceId: string | null,
    session?: ClientSession,
  ): Promise<void>;
}

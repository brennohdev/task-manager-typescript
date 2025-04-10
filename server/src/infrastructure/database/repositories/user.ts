import mongoose, { ClientSession, Types } from "mongoose";
import { IUserRepository } from "../../../domain/repositories/user";
import { User } from "../../../domain/entities/User";
import UserModel from "../models/user";
import { hashPassword } from "../../../shared/utils/bcrypt";

export class UserRepository implements IUserRepository {
  private mapToEntity(userDoc: any): User {
    return new User(
      userDoc.name,
      userDoc.email,
      userDoc.profilePicture ?? null,
      userDoc.isActive,
      userDoc.lastLogin,
      userDoc.currentWorkspace ? userDoc.currentWorkspace.toString() : null,
      userDoc._id.toString(),
      userDoc.createdAt,
      userDoc.updatedAt,
    );
  }

  private mapToPersistence(user: User): Record<string, any> {
    return {
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      currentWorkspace: user.currentWorkspace
        ? new mongoose.Types.ObjectId(user.currentWorkspace)
        : null,
    };
  }

  async queryUser(query: Record<string, unknown>): Promise<User | undefined> {
    const user = await UserModel.findOne(query).lean();
    return user ? this.mapToEntity(user) : undefined;
  }

  async create(userData: Omit<User, "id">, session?: ClientSession): Promise<User> {
    const data = this.mapToPersistence(userData);
    const [createdUser] = await UserModel.create([data], { session });
    return this.mapToEntity(createdUser);
  }

  async createWithPassword(data: {
    name: string;
    email: string;
    password: string;
    profilePicture?: string | null;
  }, session?: ClientSession): Promise<User> {
    const hashedPassword = await hashPassword(data.password);

    const [doc] = await UserModel.create([{
      name: data.name,
      email: data.email,
      password: hashedPassword,
      profilePicture: data.profilePicture ?? null,
    }], { session });

    return this.mapToEntity(doc);
  }

  async findById(id: string): Promise<User | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const user = await UserModel.findById(id).lean();
    return user ? this.mapToEntity(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).lean();
    return user ? this.mapToEntity(user) : null;
  }

  async updateLastLogin(id: string, date: Date): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) return;
    await UserModel.findByIdAndUpdate(id, { lastLogin: date });
  }

  async update(id: string, user: User, session?: ClientSession): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    const updated = await UserModel.findByIdAndUpdate(
      id,
      this.mapToPersistence(user),
      { new: true, session }
    );

    if (!updated) {
      throw new Error("User not found");
    }

    return this.mapToEntity(updated);
  }
}

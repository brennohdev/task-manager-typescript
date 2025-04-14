import mongoose, { ClientSession } from 'mongoose';
import { IUserRepository } from '../../../domain/repositories/user';
import { User } from '../../../domain/entities/User';
import UserModel, { UserDocument } from '../models/user';
import { hashPassword } from '../../../shared/utils/bcrypt';

type CreateUserDTO = {
  name: string;
  email: string;
  profilePicture: string | null;
  id?: string;
  isActive?: boolean;
  lastLogin?: Date | null;
  currentWorkspace?: string | null;
};

type CreateUserWithPasswordDTO = {
  name: string;
  email: string;
  password: string;
  profilePicture?: string | null;
};

export class UserRepository implements IUserRepository {
  private mapToEntity(userDoc: any): User {
    return new User(
      userDoc.name,
      userDoc.email,
      userDoc.profilePicture ?? null,
      userDoc.isActive,
      userDoc.lastLogin,
      userDoc.currentWorkspace ? userDoc.currentWorkspace.toString() : undefined,
      userDoc._id?.toString(),
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
      currentWorkspace: user.currentWorkspace && mongoose.Types.ObjectId.isValid(user.currentWorkspace)
        ? new mongoose.Types.ObjectId(user.currentWorkspace)
        : null,
    };
  }

  async queryUser(query: Record<string, unknown>): Promise<User | undefined> {
    const user = await UserModel.findOne(query).lean();
    return user ? this.mapToEntity(user) : undefined;
  }

  async create(userData: CreateUserDTO, session?: ClientSession): Promise<User> {
    const data = {
      name: userData.name,
      email: userData.email,
      profilePicture: userData.profilePicture,
      isActive: userData.isActive ?? true,
      lastLogin: userData.lastLogin ?? null,
      currentWorkspace: userData.currentWorkspace && mongoose.Types.ObjectId.isValid(userData.currentWorkspace)
        ? new mongoose.Types.ObjectId(userData.currentWorkspace)
        : null,
    };

    const [createdUser] = await UserModel.create([data], { session });
    return this.mapToEntity(createdUser);
  }

  async createWithPassword(
    data: CreateUserWithPasswordDTO,
    session?: ClientSession,
  ): Promise<User> {
    const hashedPassword = await hashPassword(data.password);

    const created = new UserModel({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      profilePicture: data.profilePicture ?? null,
    });

    await created.save({ session });

    return this.mapToEntity(created);
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) return false;
    return user.comparePassword(password);
  }

  async findUserWithPasswordByEmail(email: string): Promise<UserDocument | null> {
    return await UserModel.findOne({ email }).select('+password');
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

  async findByIdWithWorkspace(id: string): Promise<User | null> {
    const userDoc = await UserModel.findById(id).populate('currentWorkspace').select('-password');

    if (!userDoc) return null;

    return this.mapToEntity(userDoc);
  }

  async update(id: string, user: User, session?: ClientSession): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    const updated = await UserModel.findByIdAndUpdate(id, this.mapToPersistence(user), {
      new: true,
      session,
    });

    if (!updated) {
      throw new Error('User not found');
    }

    return this.mapToEntity(updated);
  }

  async updateCurrentWorkspace(
    userId: string,
    workspaceId: string | null,
    session?: ClientSession,
  ): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }
  
    const update: Record<string, any> = {
      currentWorkspace: workspaceId && mongoose.Types.ObjectId.isValid(workspaceId)
        ? new mongoose.Types.ObjectId(workspaceId)
        : null,
    };
  
    await UserModel.findByIdAndUpdate(userId, update, { session });
  }
}

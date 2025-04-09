import { IUserRepository } from '../../../domain/repositories/userContract'; 
import UserModel from "../models/userModel";
import { User } from "../../../domain/entities/User";
import mongoose from "mongoose";

export class UserRepository implements IUserRepository {
    private mapToEntity(userDoc: any): User {
        return new User(
            userDoc.name,
            userDoc.email,
            userDoc.profilePicture,
            userDoc.isActive,
            userDoc.lastLogin,
            userDoc.currentWorkspace,
            userDoc._id.toString(),
            userDoc.createdAt,
            userDoc.updatedAt,
        );
    }

    async create(userData: Omit<User, 'id'>): Promise<User> {
        const createdUser = await UserModel.create(userData);
        return this.mapToEntity(createdUser);
    }

    async findById(id: string): Promise<User | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        const user = await UserModel.findById(id);
        return user ? this.mapToEntity(user) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email });
        return user ? this.mapToEntity(user) : null;
    }

    async updateLastLogin(id: string, date: Date): Promise<void> {
        await UserModel.findByIdAndUpdate(id, { lastLogin: date });
    }
}

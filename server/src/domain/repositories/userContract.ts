import { User } from "../entities/User";

// User repository interface defining the contract
export interface IUserRepository {
    create(userData: Omit<User, 'id'>): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    updateLastLogin(id: string, date: Date): Promise<void>;
}


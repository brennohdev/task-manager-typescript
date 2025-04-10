import { Account } from "../entities/Account";
import { Types } from "mongoose";

export interface IAccountRepository {
    create(accountData: Omit<Account, "id">): Promise<Account>;
    findByProviderId(providerId: string): Promise<Account | null>;
    findByUserId(userId: Types.ObjectId | string): Promise<Account[]>;
    updateRefreshToken(providerId: string, refreshToken: string, tokenExpiry: Date): Promise<void>;
}

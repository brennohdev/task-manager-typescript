import { Account } from "../../domain/entities/Account";

export interface IAccountRepository {
    create(accountData: Omit<Account, "id">): Promise<Account>;
    findByProviderId(providerId: string): Promise<Account | null>;
    findByUserId(userId: string): Promise<Account[]>;
    updateRefreshToken(providerId: string, refreshToken: string, tokenExpiry: Date): Promise<void>;
}

import { IAccountRepository } from "../../../domain/repositories/account";
import { Account } from "../../../domain/entities/Account";
import AccountModel from "../models/account";
import { Types } from "mongoose";

export class AccountRepository implements IAccountRepository {
    async create(account: Account, session?: unknown): Promise<Account> {
        const [doc] = await AccountModel.create(
            [{
                provider: account.provider,
                providerId: account.providerId,
                userId: new Types.ObjectId(account.userId),
                refreshToken: account.refreshToken,
                tokenExpiry: account.tokenExpiry,
            }],
            { session }
        );

        return this.toEntity(doc);
    }

    async findByProviderId(providerId: string): Promise<Account | null> {
        const doc = await AccountModel.findOne({ providerId });
        return doc ? this.toEntity(doc) : null;
    }

    async findByUserId(userId: string): Promise<Account[]> {
        if (!Types.ObjectId.isValid(userId)) return [];

        const docs = await AccountModel.find({ userId: new Types.ObjectId(userId) });
        return docs.map((doc) => this.toEntity(doc));
    }

    async updateRefreshToken(providerId: string, refreshToken: string, tokenExpiry: Date): Promise<void> {
        await AccountModel.findOneAndUpdate(
            { providerId },
            { refreshToken, tokenExpiry }
        );
    }

    private toEntity(doc: any): Account {
        return new Account(
            doc.provider,
            doc.providerId,
            doc.userId.toString(),
            doc.refreshToken,
            doc.tokenExpiry,
            doc._id.toString(),
            doc.createdAt,
            doc.updatedAt
        );
    }
}

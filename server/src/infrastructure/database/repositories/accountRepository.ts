import { IAccountRepository } from "../../../domain/repositories/accountContract";
import { Account } from "../../../domain/entities/Account";
import AccountModel from "../models/accountModel";

export class AccountRepository implements IAccountRepository {
    async create(account: Account): Promise<Account> {
        const doc = await AccountModel.create({
            provider: account.provider,
            providerId: account.providerId,
            userId: account.userId,
            refreshToken: account.refreshToken,
            tokenExpiry: account.tokenExpiry
        });

        return this.toEntity(doc);
    }

    async findByProviderId(providerId: string): Promise<Account | null> {
        const doc = await AccountModel.findOne({ providerId });
        return doc ? this.toEntity(doc) : null;
    }

    async findByUserId(userId: string): Promise<Account[]> {
        const docs = await AccountModel.find({ userId });
        return docs.map(this.toEntity);
    }

    async updateRefreshToken(providerId: string, refreshToken: string, tokenExpiry: Date): Promise<void> {
        await AccountModel.findOneAndUpdate({ providerId }, {
            refreshToken,
            tokenExpiry
        });
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

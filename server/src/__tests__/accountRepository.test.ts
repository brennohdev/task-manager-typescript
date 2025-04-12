import mongoose, { Types } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AccountRepository } from '../infrastructure/database/repositories/account';
import { Account } from '../domain/entities/Account';
import { ProviderEnum } from '../domain/enums/accountProvider';

let mongo: MongoMemoryServer;
let repository: AccountRepository;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
  repository = new AccountRepository();
}, 15000);

afterEach(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongo.stop();
}, 15000);

describe('AccountRepository', () => {
  it('should create a new account', async () => {
    const userId = new Types.ObjectId();

    const account = new Account(
      ProviderEnum.GOOGLE,
      'google-uid-1',
      userId,
      'refresh-token-123',
      new Date(),
    );

    const created = await repository.create(account);

    expect(created).toBeInstanceOf(Account);
    expect(created.provider).toBe(ProviderEnum.GOOGLE);
    expect(created.providerId).toBe('google-uid-1');
    expect(created.userId.toString()).toBe(userId.toString());
  });

  it('should find account by providerId', async () => {
    const userId = new Types.ObjectId();

    const account = new Account(
      ProviderEnum.GITHUB,
      'github-uid-99',
      userId,
      'token-xyz',
      new Date(),
    );

    await repository.create(account);

    const found = await repository.findByProviderId('github-uid-99');

    expect(found).not.toBeNull();
    expect(found?.provider).toBe(ProviderEnum.GITHUB);
    expect(found?.providerId).toBe('github-uid-99');
  });

  it('should find accounts by userId', async () => {
    const userId = new Types.ObjectId();

    const acc1 = new Account(ProviderEnum.GOOGLE, 'uid-1', userId, null, null);
    const acc2 = new Account(ProviderEnum.GITHUB, 'uid-2', userId, null, null);

    await repository.create(acc1);
    await repository.create(acc2);

    const found = await repository.findByUserId(userId.toString());

    expect(found).toHaveLength(2);
    expect(found[0].userId.toString()).toBe(userId.toString());
    expect(found[1].userId.toString()).toBe(userId.toString());
  });

  it('should update refreshToken and tokenExpiry', async () => {
    const userId = new Types.ObjectId();
    const initialDate = new Date('2023-01-01T00:00:00Z');

    const account = new Account(
      ProviderEnum.GITHUB,
      'uid-to-update',
      userId,
      'old-token',
      initialDate,
    );

    await repository.create(account);

    const newToken = 'new-refresh-token';
    const newExpiry = new Date('2025-12-31T23:59:59Z');

    await repository.updateRefreshToken('uid-to-update', newToken, newExpiry);

    const updated = await repository.findByProviderId('uid-to-update');

    expect(updated?.refreshToken).toBe(newToken);
    expect(updated?.tokenExpiry?.toISOString()).toBe(newExpiry.toISOString());
  });
});

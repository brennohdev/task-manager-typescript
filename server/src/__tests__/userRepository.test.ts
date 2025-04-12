import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../domain/entities/User';
import { UserRepository } from '../infrastructure/database/repositories/user';
import UserModel from '../infrastructure/database/models/user';

describe('UserRepository', () => {
  let mongoServer: MongoMemoryServer;
  let repository: UserRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
    repository = new UserRepository();
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('Plain Users', () => {
    it('should create a new user', async () => {
      const user = new User('Test User', 'test@email.com', null);
      const createdUser = await repository.create(user);

      expect(createdUser).toBeInstanceOf(User);
      expect(createdUser.email).toBe('test@email.com');
    });

    it('should find a user by email', async () => {
      const user = new User('Email User', 'email@email.com', null);
      await repository.create(user);

      const foundUser = await repository.findByEmail('email@email.com');
      expect(foundUser).not.toBeNull();
      expect(foundUser?.email).toBe('email@email.com');
    });

    it('should find a user by ID', async () => {
      const user = await repository.create(new User('ID User', 'id@email.com', null));
      const foundUser = await repository.findById(user.id!);

      expect(foundUser).not.toBeNull();
      expect(foundUser?.email).toBe('id@email.com');
    });

    it('should update lastLogin', async () => {
      const user = await repository.create(new User('Login User', 'login@email.com', null));
      await repository.updateLastLogin(user.id!, new Date());

      const updatedUser = await repository.findById(user.id!);
      expect(updatedUser?.lastLogin).toBeInstanceOf(Date);
    });

    it('should query user by custom field', async () => {
      const user = new User('Query User', 'query@email.com', null);
      await repository.create(user);

      const queriedUser = await repository.queryUser({ email: 'query@email.com' });
      expect(queriedUser).not.toBeNull();
      expect(queriedUser?.name).toBe('Query User');
    });

    it('should update user fields', async () => {
      const user = await repository.create(new User('Original Name', 'update@email.com', null));

      const updated = await repository.update(
        user.id!,
        new User(
          'Updated Name',
          user.email,
          user.profilePicture,
          user.isActive,
          user.lastLogin,
          user.currentWorkspace,
          user.id,
          user.createdAt,
          user.updatedAt,
        ),
      );

      expect(updated.name).toBe('Updated Name');
    });
  });

  describe('Password Users', () => {
    it('should create a user with password and verify it', async () => {
      const user = await repository.createWithPassword({
        name: 'Secure User',
        email: 'secure@email.com',
        password: 'StrongPass123',
      });

      expect(user.email).toBe('secure@email.com');

      const isValid = await repository.verifyPassword('secure@email.com', 'StrongPass123');
      expect(isValid).toBe(true);

      const isInvalid = await repository.verifyPassword('secure@email.com', 'WrongPass');
      expect(isInvalid).toBe(false);
    });
  });
});

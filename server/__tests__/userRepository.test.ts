import mongoose from "mongoose";
import { UserRepository } from "../src/infrastructure/database/repositories/userRepository";
import { User } from "../src/domain/entities/User";
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
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

describe("UserRepository", () => {
    const repository = new UserRepository();

    it("should create a user", async () => {
        const userData = new User("Test User", "test@email.com", null);
        const createdUser = await repository.create(userData);

        expect(createdUser).toBeInstanceOf(User);
        expect(createdUser.email).toBe("test@email.com");
    });

    it("should find a user by email", async () => {
        const userData = new User("Find User", "find@email.com", null);
        await repository.create(userData);

        const foundUser = await repository.findByEmail("find@email.com");

        expect(foundUser).not.toBeNull();
        expect(foundUser?.name).toBe("Find User");
    });

    it("should find a user by ID", async () => {
        const userData = new User("ID User", "id@email.com", null);
        const createdUser = await repository.create(userData);

        const foundUser = await repository.findById(createdUser.id!);

        expect(foundUser).not.toBeNull();
        expect(foundUser?.email).toBe("id@email.com");
    });

    it("should update last login", async () => {
        const userData = new User("Login User", "login@email.com", null);
        const createdUser = await repository.create(userData);

        const now = new Date();
        await repository.updateLastLogin(createdUser.id!, now);

        const updatedUser = await repository.findById(createdUser.id!);

        expect(updatedUser?.lastLogin?.getTime()).toBe(now.getTime());
    });
});

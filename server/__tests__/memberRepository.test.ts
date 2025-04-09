import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import MemberModel from "../src/infrastructure/database/models/memberModel";
import { MemberRepository } from "../src/infrastructure/database/repositories/memberRepository";
import { Member } from "../src/domain/entities/Member";

describe("MemberRepository", () => {
    let mongoServer: MongoMemoryServer;
    let repository: MemberRepository;

    beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
        dbName: "test-db",
    });
    repository = new MemberRepository();
    });

    afterEach(async () => {
    await MemberModel.deleteMany({});
    });

    afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    });

    it("should add a new member", async () => {
    const userId = new mongoose.Types.ObjectId();
    const workspaceId = new mongoose.Types.ObjectId();
    const joinedAt = new Date();

    const member = new Member(userId, workspaceId, joinedAt);
    const created = await repository.add(member);

    expect(created).toBeDefined();
    expect(created.userId.toString()).toBe(userId.toString());
    expect(created.workspaceId.toString()).toBe(workspaceId.toString());
    expect(created.joinedAt.toISOString()).toBe(joinedAt.toISOString());
    expect(created.id).toBeDefined();
    });

    it("should find members by workspace", async () => {
    const workspaceId = new mongoose.Types.ObjectId();

    await MemberModel.create([
        { userId: new mongoose.Types.ObjectId(), workspaceId, joinedAt: new Date() },
        { userId: new mongoose.Types.ObjectId(), workspaceId, joinedAt: new Date() },
    ]);

    const results = await repository.findByWorkspace(workspaceId);
    expect(results).toHaveLength(2);
    results.forEach(member => {
        expect(member.workspaceId.toString()).toBe(workspaceId.toString());
    });
    });

    it("should find members by user ID", async () => {
    const userId = new mongoose.Types.ObjectId();

    await MemberModel.create([
        { userId, workspaceId: new mongoose.Types.ObjectId(), joinedAt: new Date() },
        { userId, workspaceId: new mongoose.Types.ObjectId(), joinedAt: new Date() },
    ]);

    const results = await repository.findByUserId(userId);
    expect(results).toHaveLength(2);
    results.forEach(member => {
        expect(member.userId.toString()).toBe(userId.toString());
    });
    });

    it("should remove a member", async () => {
    const doc = await MemberModel.create({
        userId: new mongoose.Types.ObjectId(),
        workspaceId: new mongoose.Types.ObjectId(),
        joinedAt: new Date(),
    });

    await repository.remove(doc._id as mongoose.Types.ObjectId);

    const found = await MemberModel.findById(doc._id);
    expect(found).toBeNull();
    });
});

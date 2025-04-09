import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { WorkspaceRepository } from "../src/infrastructure/database/repositories/workspaceRepository";
import { Workspace } from "../src/domain/entities/Workspace";
import { generateInviteCode } from "../src/shared/utils/generateInviteCode";
import { Types } from "mongoose";

let mongo: MongoMemoryServer;
let repository: WorkspaceRepository;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
    repository = new WorkspaceRepository();
}, 15000);

afterEach(async () => {
    if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
    }
});

afterAll(async () => {
    if (mongoose.connection.db) {
    await mongoose.connection.dropDatabase();
    }
    await mongoose.disconnect();
    await mongo.stop();
}, 15000);

describe("WorkspaceRepository", () => {
    it("should create a workspace", async () => {
    const workspace = new Workspace(
        "Workspace One",
        "Description here",
        new Types.ObjectId(),
        generateInviteCode()
    );

    const created = await repository.create(workspace);

    expect(created).toBeInstanceOf(Workspace);
    expect(created.name).toBe("Workspace One");
    expect(created.description).toBe("Description here");
    expect(created.inviteCode).toBeDefined();
});

    it("should find a workspace by invite code", async () => {
    const code = generateInviteCode();
    const workspace = new Workspace("Workspace Find", null, new Types.ObjectId(), code);
    await repository.create(workspace);

    const found = await repository.findByInviteCode(code);
    expect(found).not.toBeNull();
    expect(found?.inviteCode).toBe(code);
});

    it("should find all workspaces by owner ID", async () => {
    const ownerId = new Types.ObjectId();
    const w1 = new Workspace("Work One", null, ownerId, generateInviteCode());
    const w2 = new Workspace("Work Two", null, ownerId, generateInviteCode());

    await repository.create(w1);
    await repository.create(w2);

    const found = await repository.findByOwnerId(ownerId);
    expect(found).toHaveLength(2);
    expect(found[0].owner.toString()).toBe(ownerId.toString());
    expect(found[1].owner.toString()).toBe(ownerId.toString());
    });

    it("should reset invite code", async () => {
    const ownerId = new Types.ObjectId();
    const originalCode = generateInviteCode();
    const workspace = new Workspace("Work Reset", null, ownerId, originalCode);

    const created = await repository.create(workspace);
    const beforeReset = created.inviteCode;

    await repository.resetInviteCode(created.id!);

    const updatedList = await repository.findByOwnerId(ownerId);
    const updated = updatedList[0];

    expect(updated.inviteCode).not.toBe(beforeReset);
    });
});

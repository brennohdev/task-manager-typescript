import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProjectRepository } from '../src/infrastructure/database/repositories/projectRepository';
import { Project } from '../src/domain/entities/Project';

let mongoServer: MongoMemoryServer;
const repo = new ProjectRepository();

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await mongoose.connection.db?.dropDatabase();
});

describe('ProjectRepository', () => {
    it('should create a new project', async () => {
    const project = new Project(
        'Project One',
        'A test project',
        '🎯',
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId()
    );

    const created = await repo.create(project);
    expect(created).toBeInstanceOf(Project);
    expect(created.name).toBe('Project One');
    });

    it('should find a project by ID', async () => {
    const workspaceId = new mongoose.Types.ObjectId();
    const createdById = new mongoose.Types.ObjectId();

    const created = await repo.create(
        new Project('Find Me', null, '🔍', workspaceId, createdById)
    );

    const found = await repo.findById(created.id!);
    expect(found).not.toBeNull();
    expect(found?.name).toBe('Find Me');
    });

    it('should find all projects in a workspace', async () => {
    const workspaceId = new mongoose.Types.ObjectId();
    const createdBy = new mongoose.Types.ObjectId();

    await repo.create(new Project('Project A', null, '🚀', workspaceId, createdBy));
    await repo.create(new Project('Project B', null, '🔥', workspaceId, createdBy));

    const projects = await repo.findByWorkspace(workspaceId);
    expect(projects.length).toBe(2);
    expect(projects.map(p => p.name)).toEqual(expect.arrayContaining(['Project A', 'Project B']));
    });

    it('should update a project', async () => {
    const workspaceId = new mongoose.Types.ObjectId();
    const createdBy = new mongoose.Types.ObjectId();

    const created = await repo.create(new Project('Old Name', 'desc', '🎯', workspaceId, createdBy));

    created.name = 'Updated Name';
    created.description = 'Updated description';
    created.emoji = '🔥';

    await repo.update(created);

    const updated = await repo.findById(created.id!);
    expect(updated?.name).toBe('Updated Name');
    expect(updated?.description).toBe('Updated description');
    expect(updated?.emoji).toBe('🔥');
    });

    it('should delete a project', async () => {
    const workspaceId = new mongoose.Types.ObjectId();
    const createdBy = new mongoose.Types.ObjectId();

    const created = await repo.create(new Project('To Delete', null, '❌', workspaceId, createdBy));
    await repo.delete(created.id!);

    const deleted = await repo.findById(created.id!);
    expect(deleted).toBeNull();
    });
});

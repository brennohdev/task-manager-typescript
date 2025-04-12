import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { createWorkspaceService } from '../application/services/workspace';
import { UserRepository } from '../infrastructure/database/repositories/user';

describe('createWorkspaceService', () => {
    let replSet: MongoMemoryReplSet;
    let userRepository: UserRepository;

    beforeAll(async () => {
        replSet = await MongoMemoryReplSet.create({
            replSet: { count: 1 },
        });

        const uri = replSet.getUri();
        await mongoose.connect(uri, { dbName: 'test-db' });

        userRepository = new UserRepository();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await replSet.stop();
    });

    it('should create a workspace successfully', async () => {
        const body = { name: 'Test Workspace', description: 'Test Description' };

        // Criar um usuário para o teste
        await userRepository.create({ name: 'Test User', email: 'test@example.com', profilePicture: null });

        const user = await userRepository.findByEmail('test@example.com');

        if (!user) {
            throw new Error('User not found after creation');
        }

        const workspace = await createWorkspaceService(user.id!.toString(), body);

        expect(workspace).toHaveProperty('id');
        expect(workspace).toHaveProperty('name', 'Test Workspace');
        expect(workspace).toHaveProperty('description', 'Test Description');
    });

    it('should throw an error if user is not found', async () => {
        const userId = new mongoose.Types.ObjectId();
        const body = { name: 'Test Workspace', description: 'Test Description' };

        await expect(createWorkspaceService(userId.toString(), body)).rejects.toThrow('User not found.');
    });
});

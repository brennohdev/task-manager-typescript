import { processUserAccountFlow } from '../application/services/auth';
import { UserRepository } from '../infrastructure/database/repositories/user';
import { AccountRepository } from '../infrastructure/database/repositories/account';
import { WorkspaceRepository } from '../infrastructure/database/repositories/workspace';
import { User } from '../domain/entities/User';
import { Workspace } from '../domain/entities/Workspace';
import mongoose, { Types } from 'mongoose';

// Mocks dos repositórios
jest.mock('../infrastructure/database/repositories/user');
jest.mock('../infrastructure/database/repositories/account');
jest.mock('../infrastructure/database/repositories/workspace');
jest.mock('../infrastructure/database/repositories/member');

describe('processUserAccountFlow', () => {
  const userId = new Types.ObjectId().toHexString();
  const workspaceId = new Types.ObjectId().toHexString();

  const mockUser = new User('Brenno', 'brenno@example.com', null);
  mockUser.id = userId;

  const mockWorkspace = new Workspace('My Workspace', 'desc', userId, 'INV123');
  mockWorkspace.id = workspaceId;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(mongoose, 'startSession').mockResolvedValue({
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    } as any);
  });

  it('should create new user, workspace, and account', async () => {
    // Setup mocks
    (UserRepository.prototype.findByEmail as jest.Mock).mockResolvedValue(null);
    (UserRepository.prototype.create as jest.Mock).mockResolvedValue(mockUser);
    (WorkspaceRepository.prototype.create as jest.Mock).mockResolvedValue(mockWorkspace);
    (UserRepository.prototype.update as jest.Mock).mockResolvedValue(undefined);
    (AccountRepository.prototype.findByProviderId as jest.Mock).mockResolvedValue(null);
    (AccountRepository.prototype.create as jest.Mock).mockResolvedValue({});

    const result = await processUserAccountFlow({
      provider: 'GOOGLE',
      providerId: 'google-123',
      displayName: 'Brenno',
      email: 'brenno@example.com',
      picture: 'https://pic.com',
    });

    expect(result.user.name).toBe('Brenno');
    expect(UserRepository.prototype.create).toHaveBeenCalled();
    expect(WorkspaceRepository.prototype.create).toHaveBeenCalled();
    expect(AccountRepository.prototype.create).toHaveBeenCalled();
  });
});

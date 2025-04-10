import { loginOrCreateAccountService } from "../src/application/services/authService";
import { UserRepository } from "../src/infrastructure/database/repositories/userRepository";
import { AccountRepository } from "../src/infrastructure/database/repositories/accountRepository";
import { WorkspaceRepository } from "../src/infrastructure/database/repositories/workspaceRepository";
import { User } from "../src/domain/entities/User";
import { Workspace } from "../src/domain/entities/Workspace";
import mongoose, { Types } from "mongoose";

// Mocks dos repositórios
jest.mock("../src/infrastructure/database/repositories/userRepository");
jest.mock("../src/infrastructure/database/repositories/accountRepository");
jest.mock("../src/infrastructure/database/repositories/workspaceRepository");

describe("loginOrCreateAccountService", () => {
  const userId = new Types.ObjectId();
  const mockUser = new User("Brenno", "brenno@example.com", null);
  mockUser.id = userId.toHexString(); // ✅ agora é uma string válida de ObjectId

  const mockWorkspace = new Workspace(
    "My Workspace",
    "desc",
    userId, // ✅ passa o ObjectId real aqui
    "INV123"
  );
  mockWorkspace.id = new Types.ObjectId();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(mongoose, "startSession").mockResolvedValue({
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    } as any);
  });

  it("should create new user, workspace, and account", async () => {
    // Setup mocks
    (UserRepository.prototype.findByEmail as jest.Mock).mockResolvedValue(null);
    (UserRepository.prototype.create as jest.Mock).mockResolvedValue(mockUser);
    (WorkspaceRepository.prototype.create as jest.Mock).mockResolvedValue(mockWorkspace);
    (UserRepository.prototype.update as jest.Mock).mockResolvedValue(undefined);
    (AccountRepository.prototype.findByProviderId as jest.Mock).mockResolvedValue(null);
    (AccountRepository.prototype.create as jest.Mock).mockResolvedValue({});

    const result = await loginOrCreateAccountService({
      provider: "GOOGLE",
      providerId: "google-123",
      displayName: "Brenno",
      email: "brenno@example.com",
      picture: "https://pic.com",
    });

    expect(result.user.name).toBe("Brenno");
    expect(UserRepository.prototype.create).toHaveBeenCalled();
    expect(WorkspaceRepository.prototype.create).toHaveBeenCalled();
    expect(AccountRepository.prototype.create).toHaveBeenCalled();
  });
});

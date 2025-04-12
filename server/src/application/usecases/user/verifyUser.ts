import { UserRepository } from "../../../infrastructure/database/repositories/user";

export const checkIfUserExists = async (
    userId: string,
    userRepository: UserRepository,
): Promise<boolean> => {
    const user = await userRepository.findById(userId);
    return !!user;
}
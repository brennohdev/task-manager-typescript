import { Member } from "../../../domain/entities/Member";
import { UserRepository } from "../../../infrastructure/database/repositories/user";

export const mapMembersWithUserData = async (
    members: Member[],
    userRepository: UserRepository
  ) => {
    return Promise.all(
      members.map(async (member) => {
        const user = await userRepository.findById(member.userId.toString());
  
        return {
          id: member.id,
          joinedAt: member.joinedAt,
          user: user
            ? {
                id: user.id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
              }
            : null,
        };
      })
    );
  };
import { generateInviteCode } from "../../shared/utils/generateInviteCode";

// Workspace entity
export class Workspace {
  constructor(
    public name: string,
    public description: string | null,
    public owner: string, 
    public inviteCode: string,
    public id?: string, 
    public updatedAt?: Date,
  ) {}

  resetInviteCode() {
    this.inviteCode = generateInviteCode();
  }
}

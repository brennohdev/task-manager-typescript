import { Types } from 'mongoose';
import { generateInviteCode } from '../../shared/utils/generateInviteCode';

export class Workspace {
  constructor(
    public name: string,
    public description: string | null,
    public owner: string, // userId como string
    public inviteCode: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public id?: string, // workspaceId como string,
  ) {}

  resetInviteCode() {
    this.inviteCode = generateInviteCode();
  }
}

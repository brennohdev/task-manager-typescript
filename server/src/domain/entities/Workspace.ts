import { generateInviteCode } from "../../shared/utils/generateInviteCode";

// Workspace entity
export class Workspace {
  constructor(
    public name: string,
    public description: string | null,
    public owner: string, // owner é string para facilitar o fluxo na aplicação
    public inviteCode: string,
    public id?: string, // ID gerado pelo Mongoose será automaticamente mapeado
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  resetInviteCode() {
    this.inviteCode = generateInviteCode();
  }
}

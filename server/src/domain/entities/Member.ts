
export class Member {
  constructor(
    public userId: string,
    public workspaceId: string,
    public joinedAt: Date,
    public id?: string,
  ) {}
}

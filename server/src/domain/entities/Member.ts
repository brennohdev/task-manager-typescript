
export class Member {
  constructor(
    public userId: string,
    public workspaceId: string,
    public joinedAt: Date,
    public id?: string,
    public name?: string,
    public email?: string,
    public profilePicture?: string
  ) {}
}


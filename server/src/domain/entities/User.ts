export class User {
  constructor(
    public name: string,
    public email: string,
    public profilePicture: string | null,
    public isActive: boolean = true,
    public lastLogin: Date | null = null,
    public currentWorkspace: string | undefined = undefined,
    public id?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static createNewUser(name: string, email: string, profilePicture: string | null): User {
    return new User(name, email, profilePicture);
  }
}

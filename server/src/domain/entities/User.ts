export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public profilePicture: string | null = null,
        public isActive: boolean = true,
        public lastLogin: Date | null = null,
        public currentWorkspace: string | null = null,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}
}
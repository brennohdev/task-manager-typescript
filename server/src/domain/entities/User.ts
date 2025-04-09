export class User {
    constructor(
        public name: string,
        public email: string,
        public profilePicture: string | null,
        public isActive: boolean = true,
        public lastLogin: Date | null = null,
        public currentWorkspace: string | null = null,
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}
}
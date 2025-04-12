import { User as AppUser } from '../domain/entities/User';
import { UserDocument } from '../infrastructure/database/models/user';
import { User as DomainUser } from '../../domain/entities/User';

declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      email: string;
      picture?: string;
      currentWorkspace?: string;
    }
  }
}

declare global {
  namespace Express {
    interface User extends DomainUser {}
  }
}

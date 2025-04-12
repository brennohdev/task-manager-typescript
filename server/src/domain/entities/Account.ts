import { ProviderEnum, ProviderEnumType } from '../enums/accountProvider';
import { Types } from 'mongoose';

export class Account {
  constructor(
    public provider: ProviderEnumType,
    public providerId: string,
    public userId: Types.ObjectId | string,
    public refreshToken: string | null = null,
    public tokenExpiry: Date | null = null,
    public id?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

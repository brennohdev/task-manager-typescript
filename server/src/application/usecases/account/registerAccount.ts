import { Account } from '../../../domain/entities/Account';
import { ProviderEnum } from '../../../domain/enums/accountProvider';
import { AccountRepository } from '../../../infrastructure/database/repositories/account';

export const registerAccount = async (
  provider: keyof typeof ProviderEnum,
  providerId: string,
  userId: string,
  accountRepository: AccountRepository,
  picture?: string | null,
  session?: any,
) => {
  const account = new Account(provider, providerId, userId, picture);
  return accountRepository.create(account, session);
};

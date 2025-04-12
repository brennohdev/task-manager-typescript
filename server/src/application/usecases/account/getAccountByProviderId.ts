import { AccountRepository } from '../../../infrastructure/database/repositories/account';

export const getAccountByProviderId = async (
  providerId: string,
  accountRepository: AccountRepository,
) => {
  return accountRepository.findByProviderId(providerId);
};

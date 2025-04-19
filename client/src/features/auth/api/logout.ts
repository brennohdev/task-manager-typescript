// No frontend (api/logout.ts)
import { api } from '@/lib/axios';

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

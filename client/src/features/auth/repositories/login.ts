import { api } from '@/lib/axios';
import { LoginPayload, LoginResponse, loginResponseSchema } from '../../../validator/authSchema';

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post('/auth/login', data);
  console.log('Response:', res.data);

  return loginResponseSchema.parse(res.data);
};

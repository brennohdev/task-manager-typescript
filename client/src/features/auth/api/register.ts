import { api } from '@/lib/axios';
import {
  RegisterPayload,
  RegisterResponse,
  registerResponseSchema,
} from '../../../validator/authSchema';

export const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
  const res = await api.post('/auth/register', data);
  console.log('Response:', res.data);

  return registerResponseSchema.parse(res.data);
};

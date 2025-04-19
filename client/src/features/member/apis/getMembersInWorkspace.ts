import { api } from '@/lib/axios';
import { getAllMembersResponseSchema } from '@/validator/memberSchema';

export const getMembersDetails = async (workspaceId: string) => {
  const response = await api.get(`/workspace/members/${workspaceId}`);
  const parsed = getAllMembersResponseSchema.parse(response.data);

  return parsed.members.members;
};

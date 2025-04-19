import { api } from '@/lib/axios';
import { workspaceListResponseSchema } from '@/validator/workspaceSchema';

export const getUserWorkspaces = async () => {
  const res = await api.get('/workspace/all');
  const parsed = workspaceListResponseSchema.parse(res.data);

  return parsed.workspaces;
};

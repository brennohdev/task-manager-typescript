import { api } from '@/lib/axios';
import {
  CreateWorkspacePayload,
  CreateWorkspaceResponse,
  workspaceResponseSchema,
} from '@/validator/workspaceSchema';

export const createWorkspace = async (
  data: CreateWorkspacePayload,
): Promise<CreateWorkspaceResponse> => {
  const res = await api.post('/workspace', data);
  console.log('Response', res.data);

  return workspaceResponseSchema.parse(res.data);
};

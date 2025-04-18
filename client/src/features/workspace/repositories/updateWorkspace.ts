import { api } from '@/lib/axios';
import {
  UpdateWorkspacePayload,
  UpdateWorkspaceResponse,
  workspaceResponseSchema,
} from '@/validator/workspaceSchema';

export const updateWorkspace = async (
    id: string,
  data: UpdateWorkspacePayload,
): Promise<UpdateWorkspaceResponse> => {
  const res = await api.put(`/workspace/update/${id}`, data);

  return workspaceResponseSchema.parse(res.data);
};

import { api } from '@/lib/axios';

export const deleteWorkspace = async (
  id: string,
): Promise<{ message: string; currentWorkspace: string | null }> => {
  const res = await api.delete(`/workspace/delete/${id}`);

  return res.data;
};

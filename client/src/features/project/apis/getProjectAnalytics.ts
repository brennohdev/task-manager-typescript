import { api } from '@/lib/axios';
import { getAnalyticsFromProjectsResponse } from '@/validator/projectSchema';

export const getAnalyticsFromProjects = async (projectId: string, workspaceId: string) => {
  const response = await api.get(`/project/${projectId}/workspace/${workspaceId}/analytics`);
  const parsed = getAnalyticsFromProjectsResponse.parse(response.data);

  return parsed.result.analytics;
};

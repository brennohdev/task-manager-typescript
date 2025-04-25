import { api } from '@/lib/axios';
import { getWorkspaceAnalyticsResponseSchema } from '@/validator/workspaceSchema';

export const getWorkspaceAnalytics = async (workspaceId: string) => {
  const response = await api.get(`/workspace/analytics/${workspaceId}`);
  const parsed = getWorkspaceAnalyticsResponseSchema.parse(response.data);

  return parsed.workspaceAnalytics.analytics;
};

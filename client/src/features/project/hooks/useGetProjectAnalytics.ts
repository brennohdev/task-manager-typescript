import { useQuery } from "@tanstack/react-query"
import { getAnalyticsFromProjects } from "../apis/getProjectAnalytics"

export const useGetProjectAnalytics = (projectId: string, workspaceId: string) => {
    return useQuery({
        queryKey: ['project-analytics', workspaceId, projectId],
        queryFn: () => getAnalyticsFromProjects(projectId, workspaceId),
        enabled: !!workspaceId && !!projectId
    })
}
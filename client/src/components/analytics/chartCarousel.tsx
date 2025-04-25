import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { Card } from '../ui/card';
import { Carousel } from '../ui/carousel';
import WorkspaceAnalyticsChart from './dashboardChart';
import { useGetWorkspaceAnalytics } from '@/features/workspace/hooks/useGetWorkspaceAnalytics';
import { PageLoader } from '../pageLoader';

export const DashboardCarousel = () => {
  const workspaceId = useWorkspaceId();
  const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics(workspaceId);

  if (isLoadingAnalytics) {
    return <PageLoader />;
  }

  if (!analytics) {
    return null;
  }

  const analyticsData = {
    totalTasks: analytics.countTotalTasks,
    overdueTasks: analytics.countOverdueTasks,
    completedTasks: analytics.countCompletedTasks,
  };

  return (
    <Carousel>
      <Card>
        <WorkspaceAnalyticsChart
          countTotalTasks={analyticsData.totalTasks}
          countOverdueTasks={analyticsData.overdueTasks}
          countCompletedTasks={analyticsData.completedTasks}
        />
      </Card>

      {/* Outros Gráficos */}
      <Card>
        <WorkspaceAnalyticsChart
          countTotalTasks={analyticsData.totalTasks}
          countOverdueTasks={analyticsData.overdueTasks}
          countCompletedTasks={analyticsData.completedTasks}
        />
      </Card>

      {/* Adicione mais cards para outros gráficos */}
    </Carousel>
  );
};

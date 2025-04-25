import { AnalyticsCard } from '../analytics/analyticsCard';
import { DottedSeparator } from '../separator';
import { ScrollArea } from '../ui/scroll-area';

interface AnalyticsProps {
  data?: {
    totalTasks: number;
    overdueTasks: number;
    completedTasks: number;
  };
}

export const Analytics = ({ data }: AnalyticsProps) => {
  if (!data) return null;

  const completedPercentage =
    data.totalTasks > 0 ? Math.round((data.completedTasks / data.totalTasks) * 100) : 0;

  const overduePercentage =
    data.totalTasks > 0 ? Math.round((data.overdueTasks / data.totalTasks) * 100) : 0;

  const incompleteTasks = data.totalTasks - (data.completedTasks + data.overdueTasks);
  const incompletePercentage =
    data.totalTasks > 0 ? Math.round((incompleteTasks / data.totalTasks) * 100) : 0;

  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row gap-4 flex-wrap sm:flex-nowrap">
        <AnalyticsCard
          title="Total tasks"
          value={data.totalTasks}
          variant={data.completedTasks >= data.overdueTasks ? 'up' : 'down'}
          increaseValue={data.completedTasks - data.overdueTasks}
        />

        <AnalyticsCard
          title="Incomplete tasks"
          value={incompleteTasks}
          variant={incompleteTasks === 0 ? 'up' : 'down'}
          increaseValue={incompletePercentage}
        />
        <AnalyticsCard
          title="Completed tasks"
          value={data.completedTasks}
          variant={completedPercentage >= 50 ? 'up' : 'down'}
          increaseValue={completedPercentage}
        />
        <AnalyticsCard
          title="Overdue tasks"
          value={data.overdueTasks}
          variant={data.overdueTasks === 0 ? 'up' : 'down'}
          increaseValue={overduePercentage}
        />
      </div>
    </ScrollArea>
  );
};

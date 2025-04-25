'use client';

import { useWorkspaceMembers } from '@/features/member/hooks/useGetMembersInWorkspace';
import { useGetProjects } from '@/features/project/hooks/useGetProjects';
import { useGetTasks } from '@/features/task/hook/useGetTasks';
import { useGetWorkspaceAnalytics } from '@/features/workspace/hooks/useGetWorkspaceAnalytics';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { PageLoader } from '../pageLoader';
import { Analytics } from '../layout/analytics';
import { z } from 'zod';
import { getAllTasksResponseSchema } from '@/validator/taskSchema';
import { DottedSeparator } from '../separator';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import { Calendar1Icon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../ui/button';
import { ProjectList } from './projectList';
import WorkspaceAnalyticsChart from '../analytics/dashboardChart';
import { Memberslist } from './memberList';
import Image from 'next/image';

export const WorkspaceDashboard = () => {
  const workspaceId = useWorkspaceId();

  const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics(workspaceId);
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks(workspaceId, undefined);
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects(workspaceId);
  const { data: members, isLoading: isLoadingMembers } = useWorkspaceMembers(workspaceId);

  const isLoading = isLoadingAnalytics || isLoadingMembers || isLoadingTasks || isLoadingProjects;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!analytics || !tasks || !projects || !members) {
    return null;
  }

  const analyticsData = {
    totalTasks: analytics.countTotalTasks,
    overdueTasks: analytics.countOverdueTasks,
    completedTasks: analytics.countCompletedTasks,
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Gráfico de Analytics */}
      <Analytics data={analyticsData} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Coluna 1: Tasks e Projects */}
        <div className="flex flex-col gap-y-4">
          <TaskList />
          <Memberslist />
        </div>

        {/* Coluna 2: Gráfico */}
        <div className="xl:col-span-1">
          <WorkspaceAnalyticsChart
            countTotalTasks={analytics.countTotalTasks}
            countOverdueTasks={analytics.countOverdueTasks}
            countCompletedTasks={analytics.countCompletedTasks}
          />
          <ProjectList />
          <Image
            src="/visual-data-animate.svg"
            alt="Visual Data Dashboard Animated from storyset"
            width={300}
            height={200} // você pode ajustar conforme o aspecto desejado
            className="mx-auto mt-4 rounded-lg hidden md:block"
          />{' '}
        </div>
      </div>
    </div>
  );
};

export const TaskList = () => {
  const workspaceId = useWorkspaceId();
  const { data: analytics } = useGetWorkspaceAnalytics(workspaceId);
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks(workspaceId, undefined);

  if (!analytics || !tasks) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({analytics?.countTotalTasks})</p>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="flex flex-col divide-y divide-muted-foreground/10">
          {tasks?.tasks.slice(0, 5).map((task) => (
            <li key={task.id}>
              <Link
                href={`/workspace/${workspaceId}/project/${task.project._id}/task/${task.id}`}
                className="block py-2 px-1 hover:bg-muted/50 rounded transition"
              >
                <p className="text-sm font-medium truncate">{task.title}</p>
                <div className="flex items-center gap-x-1 text-xs text-muted-foreground mt-0.5">
                  <span>{task.project?.emoji}</span>
                  <span className="truncate">{task.project?.name}</span>
                  {task.dueDate && (
                    <>
                      <span className="mx-1">•</span>
                      <Calendar1Icon className="size-3 mr-0.5" />
                      <span>{formatDistanceToNow(new Date(task.dueDate))}</span>
                    </>
                  )}
                </div>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block py-2">
            No tasks found
          </li>
        </ul>

        <Button variant="secondary" className="mt-4 w-full" asChild>
          <Link href={`/workspace/${workspaceId}/tasks`}>Show all tasks</Link>
        </Button>
      </div>
    </div>
  );
};

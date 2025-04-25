'use client';

import { PageLoader } from '@/components/pageLoader';
import { TaskBreadcrumbs } from '@/features/task/components/taskDetails/taskBreadcrumbs';
import { useProjectId } from '@/features/project/hooks/useProjectId';
import { useGetTask } from '@/features/task/hook/useGetTaskById';
import { useTaskId } from '@/features/task/hook/useTaskId';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { useGetProjectById } from '@/features/project/hooks/useGetProjectById';
import { DottedSeparator } from '@/components/separator';
import { TaskDetails } from '@/features/task/components/taskDetails/taskDetails';
import { TaskDescription } from '@/features/task/components/taskDetails/taskDescription';

export const TaskIdClient = () => {
  const taskId = useTaskId();
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();

  const { data: taskData, isLoading: isTaskLoading } = useGetTask(taskId, projectId, workspaceId);
  const { data: projectData, isLoading: isProjectLoading } = useGetProjectById(
    projectId,
    workspaceId,
  );

  const isLoading = isTaskLoading || isProjectLoading;

  if (isLoading || !taskData || !projectData) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col gap-6">
      <TaskBreadcrumbs project={projectData} task={taskData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TaskDetails task={taskData} />
          <TaskDescription task={taskData} />
        </div>

        {/* Coluna lateral com imagem */}
        <div className="hidden lg:block rounded-2xl overflow-hidden ">
          <img
            src="/operating-system-upgrade-cuate.svg"
            alt="Task visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

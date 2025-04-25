'use client';

import { ResponsiveModal } from '@/components/responsiveModal';
import { useUpdateTaskModal } from '../hook/useUpdateTaskModal';
import { UpdateTaskFormWrapper } from './updateTaskFormWrapper';
import { useProjectId } from '@/features/project/hooks/useProjectId';

export const UpdateTaskModal = () => {
  const { taskId, close } = useUpdateTaskModal();
  const projectId = useProjectId();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && projectId && (
        <UpdateTaskFormWrapper
          id={taskId}
          onCancel={close}
          projectId={projectId}
        />
      )}
    </ResponsiveModal>
  );
};

'use client';

import { ResponsiveModal } from '@/components/responsiveModal';
import { useUpdateTaskModal } from '../hook/useUpdateTaskModal';
import { UpdateTaskFormWrapper } from './updateTaskFormWrapper';

export const UpdateTaskModal = () => {
  const { taskId, close } = useUpdateTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
        {taskId &&(
      <UpdateTaskFormWrapper id={taskId} onCancel={close} />
        )}
    </ResponsiveModal>
  );
};

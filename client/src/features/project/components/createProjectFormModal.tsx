'use client';

import { ResponsiveModal } from '@/components/responsiveModal';
import { CreateProjectForm } from './createProjectForm';
import { useCreateWorkspaceModal } from '@/features/workspace/hooks/useCreateWorkspaceModal';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { useCreateProjectModal } from '../hooks/useCreateProjectModal';

export const CretateProjectModal = () => {
  const workspaceId = useWorkspaceId();
  const { isOpen, setIsOpen, close } = useCreateProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm workspaceId={workspaceId} onCancel={close} />
    </ResponsiveModal>
  );
};

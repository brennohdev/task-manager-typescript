// src/app/(standalone)/workspace/[workspaceId]/settings/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetWorkspaceById } from '@/features/workspace/hooks/useGetWorkspaceById';
import { UpdateWorkspaceForm } from '@/features/workspace/components/updateWorkspaceForm copy';

const WorkspaceSettingsPage = () => {
  const router = useRouter();
  const { workspaceId } = useParams();

  const { data: workspace, isLoading } = useGetWorkspaceById(workspaceId as string);

  if (isLoading) return <div>Loading...</div>;
  if (!workspace) return <div>Workspace not found.</div>;

  return (
    <UpdateWorkspaceForm
      onCancel={() => router.push(`/workspace/${workspace.id}`)}
      initialValues={workspace}
    />
  );
};

export default WorkspaceSettingsPage;

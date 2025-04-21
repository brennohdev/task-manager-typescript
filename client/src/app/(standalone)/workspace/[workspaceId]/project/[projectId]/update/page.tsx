'use client';

import { useParams, useRouter } from 'next/navigation'; // ⬅️ precisa importar o router
import { useGetProjectById } from '@/features/project/hooks/useGetProjectById';
import { UpdateProjectForm } from '@/features/project/components/updateProjectForm';

export default function UpdateProjectPage() {
  const { workspaceId, projectId } = useParams();
  const router = useRouter(); // ⬅️ adiciona isso aqui

  const { data, isLoading, error } = useGetProjectById(projectId as string, workspaceId as string);

  if (isLoading) return <div>Carregando projeto...</div>;
  if (error) return <div>Erro ao carregar projeto</div>;
  if (!data) return <div>Projeto não encontrado.</div>;

  const project = data;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <UpdateProjectForm
        initialValues={{
          name: project.name,
          description: project.description ?? '',
          emoji: project.emoji ?? '',
        }}
        projectId={projectId as string}
        workspaceId={workspaceId as string}
        onCancel={() => {
          router.push(`/workspace/${workspaceId}/project/${projectId}`);
        }} 
      />
    </div>
  );
}

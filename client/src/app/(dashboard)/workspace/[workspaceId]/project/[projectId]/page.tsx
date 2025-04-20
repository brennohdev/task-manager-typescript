import ProjectClient from '@/components/project/projectClient';

interface ProjectPageProps {
  params: {
    projectId: string;
    workspaceId: string;
  };
}

const ProjectIdPage = ({ params }: ProjectPageProps) => {
  return <ProjectClient {...params} />;
};

export default ProjectIdPage;

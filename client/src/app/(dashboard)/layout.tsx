import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { CretateProjectModal } from '@/features/project/components/createProjectFormModal';
import { CreateTaskModal } from '@/features/task/components/createTaskModal';
import { TaskDetailsModal } from '@/features/task/components/TaskDetailsModal';
import { UpdateTaskModal } from '@/features/task/components/updateTaskModal.tsx';
import { CreateWorkspaceModal } from '@/features/workspace/components/createWorkspaceModal';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CretateProjectModal />
      <CreateTaskModal />
      <UpdateTaskModal />
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block log:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTaskDetailsModal } from '../hook/useTaskDetailsModal';
import { Skeleton } from '@/components/ui/skeleton';

export const TaskDetailsModal = () => {
  const { taskId, projectId, close } = useTaskDetailsModal();

  const open = !!taskId && !!projectId;

  const { data, isLoading } = useGetTaskById(projectId!, taskId!, {
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Detalhes da Tarefa</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : data?.task ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold">{data.task.title}</h2>
              <p className="text-sm text-muted-foreground">{data.task.description}</p>
            </div>

            <div className="text-sm">
              <p><strong>Status:</strong> {data.task.status}</p>
              <p><strong>Prioridade:</strong> {data.task.priority}</p>
              <p><strong>Responsável:</strong> {data.task.assignedTo?.name ?? 'Não atribuído'}</p>
              <p><strong>Data de entrega:</strong> {data.task.dueDate ? new Date(data.task.dueDate).toLocaleDateString() : 'Sem data'}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Tarefa não encontrada.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
function useGetTaskById(arg0: string, arg1: string, arg2: { enabled: boolean; }): { data: any; isLoading: any; } {
    throw new Error('Function not implemented.');
}


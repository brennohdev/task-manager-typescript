import { DottedSeparator } from '@/components/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getTaskByIdResponseSchema } from '@/validator/taskSchema';
import { PencilIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { useUpdateTask } from '../../hook/useUpdateTask';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { useProjectId } from '@/features/project/hooks/useProjectId';

type Task = z.infer<typeof getTaskByIdResponseSchema>['task'];

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description ?? '');

  const { mutate, isPending } = useUpdateTask(task.id, projectId, workspaceId);

  const handleSave = () => {
    mutate({ description: value });
  };

  return (
    <div className="bg-background rounded-2xl shadow-md p-6 border transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Task Description</h2>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="ghost"
          className="flex items-center gap-1"
        >
          {isEditing ? (
            <>
              <XIcon className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="w-4 h-4" />
              Edit
            </>
          )}
        </Button>
      </div>

      <DottedSeparator className="mb-6" />

      {isEditing ? (
        <div className="space-y-4">
          <Textarea
            placeholder="Add a meaningful description for this task..."
            value={value}
            rows={5}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
            className="resize-none transition-all duration-200"
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isPending} size="sm">
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
          {task.description || 'No description added yet.'}
        </p>
      )}
    </div>
  );
};

import { useWorkspaceMembers } from '@/features/member/hooks/useGetMembersInWorkspace';
import { useGetProjects } from '@/features/project/hooks/useGetProjects';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { getProjectsResponseSchema } from '@/validator/projectSchema';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ListChecksIcon, UserIcon } from 'lucide-react';
import {
  DueDateFilterEnum,
  DueDateFilterEnumType,
  TaskPriorityEnum,
  TaskPriorityEnumType,
  TaskStatusEnum,
  TaskStatusEnumType,
} from '@/domain/enums/taskEnums';
import { FcStatistics } from 'react-icons/fc';
import { useTaskFilters } from '../hook/useTaskFilters';
import { DatePicker } from '@/components/dataPicker';

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}

type Project = z.infer<typeof getProjectsResponseSchema>['projects'][number];

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId();

  const { data: projectsData, isLoading: isLoadingProjects } = useGetProjects(workspaceId);
  const { data: membersData, isLoading: isLoadingMembers } = useWorkspaceMembers(workspaceId);

  const isLoading = isLoadingProjects || isLoadingMembers;

  const memberOptions =
    membersData?.map((member) => ({
      value: member._id,
      label: member.userId.name,
    })) ?? [];

  const [{ status, assignedTo, projectId, dueDate, priority }, setFilters] = useTaskFilters();

  const onStatusChange = (value: string) => {
    if (value === 'all') {
      setFilters({ status: null });
    } else {
      setFilters({ status: value as TaskStatusEnumType });
    }
  };

  const onAssignedToChange = (value: string) => {
    if (value === 'all') {
      setFilters({ assignedTo: null });
    } else {
      setFilters({ assignedTo: value as string });
    }
  };

  const onPriorityChange = (value: string) => {
    if (value === 'all') {
      setFilters({ priority: null });
    } else {
      setFilters({ priority: value as TaskPriorityEnumType });
    }
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-row justify-center w-full lg:flex-row gap-2">
      <Select defaultValue={status ?? undefined} onValueChange={(value) => onStatusChange(value)}>
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatusEnum.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatusEnum.IN_PROGRESS}>IN_PROGRESS</SelectItem>
          <SelectItem value={TaskStatusEnum.IN_REVIEW}>IN_REVIEW</SelectItem>
          <SelectItem value={TaskStatusEnum.TODO}>TODO</SelectItem>
          <SelectItem value={TaskStatusEnum.DONE}>DONE</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={priority ?? undefined}
        onValueChange={(value) => onPriorityChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <FcStatistics className="size-4 mr-2" />
            <SelectValue placeholder="All priorities" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All priorities</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskPriorityEnum.LOW}>LOW</SelectItem>
          <SelectItem value={TaskPriorityEnum.MEDIUM}>MEDIUM</SelectItem>
          <SelectItem value={TaskPriorityEnum.HIGH}>HIGH</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={assignedTo ?? undefined}
        onValueChange={(value) => onAssignedToChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 mr-2" />
            <SelectValue placeholder="All members" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All members</SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DatePicker
        placeholder="Due Date"
        classname="h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null });
        }}
      />
    </div>
  );
};

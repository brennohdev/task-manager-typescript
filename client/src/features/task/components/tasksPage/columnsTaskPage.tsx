'use client';

import { taskResponseToGetAllTasksSchema } from '@/validator/taskSchema';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { ArrowUpDown, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MemberAvatar } from '@/features/member/components/memberAvatar';
import { Badge } from '@/components/ui/badge';
import { snakeCaseToTitleCase } from '@/util/snakeCaseToTitleCase';
import { TaskPriorityEnumType, TaskStatusEnumType } from '@/domain/enums/taskEnums';
import { TaskActions } from './taskActions';
import { TaskDate } from '../taskDate';

type Task = z.infer<typeof taskResponseToGetAllTasksSchema>;

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.original.title;

      return <p className="line-clamp-1">{title}</p>;
    },
  },
  {
    accessorKey: 'project.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Project
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const projectName = row.original.project?.name;
      const projectEmoji = row.original.project.emoji;
      return (
        <div className="flex items-center gap-2">
          <span>{projectEmoji}</span>
          <span className="line-clamp-1 font-medium">{projectName ?? 'No project'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;

      return <Badge variant={status as TaskStatusEnumType}>{snakeCaseToTitleCase(status)}</Badge>;
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priority = row.original.priority;

      return (
        <Badge variant={priority as TaskPriorityEnumType}>{snakeCaseToTitleCase(priority)}</Badge>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;

      return <TaskDate value={dueDate!} />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id;
      const projectId = row.original.project._id;

      return (
        <TaskActions id={id} projectId={projectId}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </TaskActions>
      );
    },
  },
];

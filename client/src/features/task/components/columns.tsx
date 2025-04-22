'use client';

import { taskResponseToGetAllTasksSchema } from '@/validator/taskSchema';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MemberAvatar } from '@/features/member/components/memberAvatar';

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
          Task Title
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
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Task Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <p className="line-clamp-1">{status}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'assignedTo',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Member Assigned
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const assignedTo = row.original.assignedTo;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          {/* Adicionando o avatar do membro */}
          <MemberAvatar
            className="size-6"
            fallbackClassName="text-xs"
            name={assignedTo?.name ?? 'No name'}
            profilePicture={assignedTo?.profilePicture ?? null} // Passando a imagem do perfil, caso exista
          />
          {/* Nome do membro */}
          <p className="line-clamp-1">{assignedTo?.name ?? 'No assigned member'}</p>
        </div>
      );
    },
  },
];

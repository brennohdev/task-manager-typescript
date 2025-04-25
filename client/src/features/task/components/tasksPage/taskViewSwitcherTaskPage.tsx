'use client';

import { DottedSeparator } from '@/components/separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Calendar1Icon, KanbanIcon, Loader, PlusIcon, Table2Icon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { useEffect, useState } from 'react';
import { useQueryState, useQueryStates } from 'nuqs';
import { DataFilters } from './dataFiltersTasksPage';
import { columns } from './columnsTaskPage';
import { useCreateTaskModal } from '../../hook/useCreateTaskModal';
import { useGetTasks } from '../../hook/useGetTasks';
import { useTaskFilters } from '../../hook/useTaskFilters';
import { DataCalendar } from '../calendar/dataCalendar';
import { DataTable } from '../dataTable';

export const TaskViewSwitcherTaskPage = () => {
  const [view, setView] = useQueryState('task-view', {
    defaultValue: 'table',
  });

  const pathname = usePathname();
  const urlProjectId = undefined;
  const workspaceId = useWorkspaceId();

  const [{ status, assignedTo, projectId, dueDate, priority }] = useTaskFilters();

  const { open } = useCreateTaskModal();
  const { data, isLoading, error } = useGetTasks(workspaceId, undefined, {
    status,
    assignedTo,
    dueDate,
    priority,
  });
  const tasks = data?.tasks;
  const pagination = data?.pagination;

  useEffect(() => {
    console.log('TASKS:', tasks);
  }, [tasks]);

  return (
    <Tabs className="flex-1 w-full border rounded-lg" defaultValue={view} onValueChange={setView}>
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              <Table2Icon className="size-4 mr-2" />
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              <Calendar1Icon className="size-4 mr-2" />
              Calendar
            </TabsTrigger>
          </TabsList>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoading ? (
          <div className="w-full border rounded-lg h-[200] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={data?.tasks ?? []} />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0 h-full pb-4">
              <DataCalendar data={data?.tasks ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

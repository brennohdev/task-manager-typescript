import { DottedSeparator } from '@/components/separator';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Calendar1Icon, KanbanIcon, PlusIcon, Table2Icon } from 'lucide-react';

export const TaskViewSwitcher = () => {
  return (
    <Tabs className="flex-1 w-full border rounded-lg" defaultValue='table'>
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
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              <KanbanIcon className="size-4 mr-2" />
              Kanban
            </TabsTrigger>
          </TabsList>
          <Button variant="primary" size="sm" className="w-full lg:w-auto">
            <PlusIcon className="size-4 mr-2" />
            Add a new Task
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        Filters incoming...
        <DottedSeparator className="my-4" />
        <>
          <TabsContent value="table" className="mt-0">
            Data table
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            Data Calendar
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            Data Kanban
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};

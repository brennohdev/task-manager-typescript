'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';

import {
  createTaskSchema,
  getTaskByIdResponseSchema,
  taskUpdateResponseSchema,
  updateTaskSchema,
} from '@/validator/taskSchema';
import { TaskPriorityEnumSchema, TaskStatusEnumSchema } from '@/domain/enums/taskEnums';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useCreateTask } from '../hook/useCreateTask';
import { useUpdateTask } from '../hook/useUpdateTask';
import { useRouter } from 'next/navigation';

type Task = z.infer<typeof taskUpdateResponseSchema>['task'];

interface UpdateTaskFormProps {
  onCancel?: () => void;
  projectOptions: { id: string; name: string; emoji: string }[];
  memberOptions: { id: string; name: string }[];
  initialValues: Task;
  projectId: string;
  workspaceId: string;
}

export const UpdateTaskForm = ({
  onCancel,
  projectOptions,
  initialValues,
  memberOptions,
  projectId,
  workspaceId,
}: UpdateTaskFormProps) => {
  const taskId = initialValues.id;
  const { mutate, isPending } = useUpdateTask(taskId, projectId, workspaceId);
  const router = useRouter();

  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      ...initialValues,
      description: initialValues.description ?? undefined,
      dueDate: initialValues.dueDate
        ? new Date(initialValues.dueDate).toISOString().split('T')[0] // "2025-04-22"
        : undefined,
    },
  });

  const onSubmit = (formValues: z.infer<typeof updateTaskSchema>) => {
    const adjustedValues = {
      ...formValues,
      dueDate: formValues.dueDate ? new Date(formValues.dueDate).toISOString() : undefined,
    };

    console.log(adjustedValues);
    console.log('Assigned To:', formValues.assignedTo);
    mutate(adjustedValues);
    router.refresh();
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Update the current Task</CardTitle>
      </CardHeader>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Task title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Optional description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TaskStatusEnumSchema.options.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TaskPriorityEnumSchema.options.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assigned To */}
            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign to</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {memberOptions.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit + Cancel */}
            <div className="flex justify-between gap-2 pt-4">
              <Button
                disabled={isPending}
                type="button"
                variant="secondary"
                onClick={onCancel}
                className={cn(!onCancel && 'invisible')}
              >
                Cancel
              </Button>
              <Button
                disabled={isPending || !form.formState.isValid}
                type="submit"
                variant="primary"
              >
                Update Task
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

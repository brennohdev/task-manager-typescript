'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card';
import { createWorkspaceSchema } from '@/validator/workspaceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DottedSeparator } from '@/components/separator';
import { Input } from '@/components/ui/input';
import { createWorkspace } from '../api/createWorkspace';
import { useCreateWorkspace } from '../hooks/useCreateWorkspace';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { JoinWorkspaceCard } from './joinWorkspaceFormByInviteCode';

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate, isPending } = useCreateWorkspace();

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex p-7">
          <CardTitle className="text-xl font-bold">Let's create a workspace!</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter workspace name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Add a short description (optional)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between gap-2">
                  <Button
                    disabled={isPending}
                    type="button"
                    size="lg"
                    variant="secondary"
                    onClick={onCancel}
                    className={cn(!onCancel && 'invisible')}
                  >
                    Cancel
                  </Button>
                  <Button disabled={isPending} type="submit" size="lg" variant="primary">
                    Create
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <JoinWorkspaceCard />
    </div>
  );
};

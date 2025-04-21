'use client';

import { useState } from 'react';
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createProjectSchema } from '@/validator/projectSchema';
import { useUpdateProject } from '../hooks/useUpdateProject';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DottedSeparator } from '@/components/separator';
import { cn } from '@/lib/utils';

type UpdateProjectFormProps = {
  onCancel: () => void;
  initialValues: z.infer<typeof createProjectSchema>;
  projectId: string;
  workspaceId: string;
};

export function UpdateProjectForm({
  onCancel,
  initialValues,
  projectId,
  workspaceId,
}: UpdateProjectFormProps) {
  const [showPicker, setShowPicker] = useState(false);

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: initialValues,
  });

  const router = useRouter();
  const { mutate: updateProject, isPending } = useUpdateProject(projectId, workspaceId);

  const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
    updateProject(values);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex p-7">
          <CardTitle className="text-xl font-bold">Edit Project</CardTitle>
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
                  name="emoji"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-x-5">
                      <FormLabel>Emoji</FormLabel>
                      <div className="relative inline-block">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowPicker((prev) => !prev)}
                          className="text-xl"
                        >
                          {field.value || '😀'}
                        </Button>

                        {showPicker && (
                          <div
                            className="absolute z-50 mt-2"
                            style={{
                              width: '300px',
                              maxHeight: '250px',
                              overflowY: 'auto',
                              backgroundColor: '#fff',
                              borderRadius: '0.5rem',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <Picker
                              data={emojiData}
                              onEmojiSelect={(emoji: any) => {
                                field.onChange(emoji.native);
                                setShowPicker(false);
                              }}
                              theme="light"
                              previewPosition="none"
                              maxFrequentRows={2}
                            />
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter project name" />
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
                        <Input {...field} placeholder="Update the description (optional)" />
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
                    onClick={() => {
                      onCancel();
                      router.push(`/workspace/${workspaceId}/project/${projectId}`);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isPending || !form.formState.isValid}
                    type="submit"
                    size="lg"
                    variant="primary"
                  >
                    Save changes
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';
import { createProjectSchema } from '@/validator/projectSchema';
import { useCreateProject } from '../hooks/useCreateProject';

interface CreateProjectFormProps {
  workspaceId: string;
  onCancel?: () => void;
}

export const CreateProjectForm = ({ workspaceId, onCancel }: CreateProjectFormProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const { mutate, isPending } = useCreateProject(workspaceId);

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      emoji: '',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
    console.log('Form values before submit:', values);
    // Verificar se o campo name está preenchido antes de enviar
    if (!values.name) {
      return; // Não submeter caso o campo name esteja vazio
    }

    mutate(values);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex p-7">
          <CardTitle className="text-xl font-bold">Let's create a Project!</CardTitle>
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
                  <Button
                    disabled={isPending || !form.formState.isValid}
                    type="submit"
                    size="lg"
                    variant="primary"
                  >
                    Create
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

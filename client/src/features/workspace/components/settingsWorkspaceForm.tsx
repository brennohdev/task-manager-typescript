import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card';
import { updateWorkspaceSchema, Workspace } from '@/validator/workspaceSchema';
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
import { useUpdateWorkspace } from '../hooks/useUpdateWorkspace';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/hook/modals/useConfirm';
import { deleteWorkspace } from '../api/deleteWorkspace';
import { useDeleteWorkspace } from '../hooks/useDeleteWorkspace';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsWorkspaceFormProps {
  onCancel: () => void;
  initialValues: Workspace;
}

export const SettingsWorkspaceForm = ({ onCancel, initialValues }: SettingsWorkspaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeleting } = useDeleteWorkspace();

  const [DeleteDialog, confirmDelete] = useConfirm(
    'Delete Workspace',
    'This action cannot be undone.',
    'destructive',
  );

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteWorkspace(initialValues.id);
  };

  const inviteLink = `${window.location.origin}/invite/${initialValues.inviteCode}/join`;
  const inviteCode = initialValues.inviteCode; // Código de convite diretamente

  const handleCopyInviteLink = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success('Invite link copied to clipboard.'));
  };

  const handleCopyInviteCode = () => {
    navigator.clipboard
      .writeText(inviteCode)
      .then(() => toast.success('Invite code copied to clipboard.'));
  };

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      name: initialValues.name,
      description: initialValues.description ?? '',
    },
  });

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    mutate({ id: initialValues.id, ...values });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 o-7 space-y-0">
          <CardTitle className="text-xl font-bold">{initialValues.name}</CardTitle>
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
                        <Input {...field} placeholder="Description" />
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
                      router.push(`/workspace/${initialValues.id}`);
                    }}
                    className={cn(!onCancel && 'invisible')}
                  >
                    Cancel
                  </Button>
                  <Button disabled={isPending} type="submit" size="lg" variant="primary">
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Seção de Invite Link */}
      <Card className="w-ful h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite people to your workspace!</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace.
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={inviteLink} />
                <Button onClick={handleCopyInviteLink} variant="secondary" className="size-12">
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção de Invite Code */}
      <Card className="w-ful h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite Code</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite code to add members to your workspace. They can use it in create
              workspace form.
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={inviteCode} />
                <Button onClick={handleCopyInviteCode} variant="secondary" className="size-12">
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção de Delete Workspace */}
      <Card className="w-ful h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Delete Workspace</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible and will remove all associated data.
            </p>
            <Button
              className="mt-6 w-fit ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              disabled={isPending || isDeleting}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

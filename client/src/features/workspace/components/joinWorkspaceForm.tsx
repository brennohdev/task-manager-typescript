'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useJoinWorkspace } from '@/features/workspace/hooks/useJoinWorkspace';
import { toast } from 'sonner';

export const JoinWorkspaceForm = () => {
  const { inviteCode } = useParams();
  const { mutate, isPending } = useJoinWorkspace();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleAccept = () => {
    if (typeof inviteCode === 'string') {
      mutate(inviteCode, {
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['workspaces'] }); // Invalidando após qualquer resultado
        },
        onSuccess: ({ workspaceId }) => {
          toast.success('Joined workspace successfully!');
          router.refresh();
          router.push(`/workspace/${workspaceId}`);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || 'Error joining workspace.');
          router.push('/');
        },
      });
    }
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>a Workspace</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <CardContent className="p-7">
          <div className="flex items-center gap-x-2 justify-between">
            <Button className="w-full lg:w-fit" variant="secondary" type="button" asChild size="lg">
              <Link href="/">Deny</Link>
            </Button>
            <Button
              className="w-full lg:w-fit"
              variant="primary"
              type="button"
              size="lg"
              onClick={handleAccept}
              disabled={isPending}
            >
              Accept
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

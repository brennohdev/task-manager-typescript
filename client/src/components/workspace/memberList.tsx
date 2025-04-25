'use client';

import { useGetProjects } from '@/features/project/hooks/useGetProjects';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { PageLoader } from '../pageLoader';
import Link from 'next/link';
import { DottedSeparator } from '../separator';
import { Button } from '../ui/button';
import { useWorkspaceMembers } from '@/features/member/hooks/useGetMembersInWorkspace';
import { MemberAvatar } from '@/features/member/components/memberAvatar';

export const Memberslist = () => {
  const workspaceId = useWorkspaceId();
  const { data: members, isLoading } = useWorkspaceMembers(workspaceId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!members) {
    return null;
  }

  if (members.length === 0) {
    return (
      <div className="bg-muted rounded-lg p-4">
        <p className="text-lg font-semibold">Members ({members.length})</p>
        <DottedSeparator className="my-4" />
        <p className="text-sm text-muted-foreground text-center">No members found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members ({members.length})</p>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="flex flex-col gap-y-2 divide-y divide-muted-foreground/10">
          {members.slice(0, 5).map((members) => (
            <li key={members.userId._id} className="flex items-center gap-1">
              <MemberAvatar name={members.userId.name} className="size-10" />
              <div className="flex flex-col  overflow-hidden">
                <p className="text-sm font-medium line-clamp-1">{members.userId.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{members.userId.email}</p>
              </div>
            </li>
          ))}
        </ul>
        <Button variant="secondary" className="mt-4 w-full" asChild>
          <Link href={`/workspace/${workspaceId}/members`}>Show all members</Link>
        </Button>
      </div>
    </div>
  );
};

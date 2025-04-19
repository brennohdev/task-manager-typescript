'use client';

import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '../../workspace/hooks/useWorkspaceId';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MoreVerticalIcon } from 'lucide-react';
import Link from 'next/link';
import { DottedSeparator } from '@/components/separator';
import { useWorkspaceMembers } from '../hooks/useGetMembersInWorkspace';
import { Fragment } from 'react';
import { MemberAvatar } from './memberAvatar';
import { Separator } from '@/components/ui/separator';

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useWorkspaceMembers(workspaceId);

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button variant="secondary" size="sm">
          <Link href={`/workspace/${workspaceId}`}>Back</Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members List</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent  className="p-7">
        {data?.map((member, index) => (
          <Fragment key={member._id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                name={member.userId.name}
                profilePicture={member.userId.profilePicture}
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.userId.name}</p>
                <p className="text-xs text-muted-foreground">
                  Joined on{' '}
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }).format(new Date(member.joinedAt))}
                </p>
              </div>
              
            </div>
            <Separator className='my-2.5'/>
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

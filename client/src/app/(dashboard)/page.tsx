'use client';

import React, { useEffect } from 'react';
import { UserButton } from '@/features/auth/components/userButton';
import { useCurrentUser } from '@/features/auth/repositories/userCurrent';
import { redirect } from 'next/dist/server/api-utils';
import { CreateWorkspaceForm } from '@/features/workspace/components/createWorkspaceForm';

export default async function Home() {
  return (
    <div className="bg-slate-500 p-4 h-full">
      <CreateWorkspaceForm onCancel={() => {}} />
    </div>
  );
}

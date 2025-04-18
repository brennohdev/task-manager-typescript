'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetWorkspaces } from '@/features/workspace/hooks/useGetWorkspaces';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/contexts/auth/authStore';

export const RedirectToFirstWorkspace = () => {
  const router = useRouter();
  const { data: workspaces, isFetched } = useGetWorkspaces(); 
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || !isFetched) return;

    if (!workspaces || workspaces.length === 0) {
      router.replace('/workspace/create');
    } else {
      router.replace(`/workspace/${workspaces[0].id}`);
    }
  }, [user, workspaces, isFetched, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin size-12 text-blue-600" />
    </div>
  );
};

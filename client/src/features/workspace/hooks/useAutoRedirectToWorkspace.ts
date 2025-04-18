import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserWorkspacesOnClientRedirect } from '../repositories/getUserWorkspacesOnClienteRedirect';

export const useAutoRedirectToWorkspace = () => {
  const router = useRouter();

  const { data, isSuccess } = useQuery({
    queryKey: ['auto-redirect-workspaces'],
    queryFn: getUserWorkspacesOnClientRedirect,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      if (data.length === 0) {
        router.push('/workspace/create');
      } else {
        router.push(`/workspace/${data[0].id}`);
      }
    }
  }, [data, isSuccess, router]);
};

'use client';

import { useCurrentUser } from '@/features/auth/api/userCurrent';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const previousUserId = useRef<string | null>(null);

  useEffect(() => {
    if (user?.id && previousUserId.current && previousUserId.current !== user.id) {
      queryClient.invalidateQueries();
    }

    if (user?.id) {
      previousUserId.current = user.id;
    }
  }, [user?.id, queryClient]);

  return <>{children}</>;
};

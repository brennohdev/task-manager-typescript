import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../api/logout';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/contexts/auth/authStore';

export const useLogout = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      queryClient.invalidateQueries();
      queryClient.clear();
      toast.success('Logged out!');

      router.push('/login');
    },
    onError: () => {
      toast.error('Failed to logout.');
    },
  });
};

import { useMutation } from '@tanstack/react-query';
import { logout } from '../repositories/logout';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/contexts/auth/authStore';

export const useLogout = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  return useMutation<void, Error>({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      toast.success('Logged out!');
      router.push('/login');
    },
    onError: () => {
      toast.error('Failed to logout.');
    },
  });
};

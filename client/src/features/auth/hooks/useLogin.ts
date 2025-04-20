import { useMutation } from '@tanstack/react-query';
import { login } from '../api/login'; // usando axios
import { LoginPayload, LoginResponse } from '../../../validator/authSchema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query'; 

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient(); 

  
  const handleLoginSuccess = () => {
    queryClient.invalidateQueries(); 
    queryClient.clear();
    toast.success('Logged in successfully!');
    router.refresh(); 
  };

  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: login,
    onSuccess: handleLoginSuccess, 
    onError: (error) => {
      const apiError = error.response?.data as { message?: string; error?: string };
      toast.error(apiError?.message || 'Error logging in.');
    },
  });
};

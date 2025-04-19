import { useMutation } from '@tanstack/react-query';
import { register } from '../api/register'; // usando axios
import { RegisterPayload, RegisterResponse } from '../../../validator/authSchema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useRegister = () => {
  const router = useRouter();

  return useMutation<RegisterResponse, AxiosError, RegisterPayload>({
    mutationFn: register,
    onSuccess: () => {
      toast.success('Now we are a team!');
    },
    onError: (error) => {
      const apiError = error.response?.data as { message?: string; error?: string };
      const message = apiError?.error || 'Failed to register. Please try again.';
      toast.error(message);
    },
  });
};

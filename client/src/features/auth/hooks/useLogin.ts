import { useMutation } from '@tanstack/react-query';
import { login } from '../repositories/login'; // usando axios
import { LoginPayload, LoginResponse } from '../../../validator/authSchema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query'; // Use esse hook no componente

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient(); // Coloque dentro do componente

  // Função de sucesso
  const handleLoginSuccess = () => {
    queryClient.invalidateQueries(); // Força o recarregamento dos dados
    queryClient.clear();
    toast.success('Logged in successfully!');
    router.refresh(); // Força o refresh da página
  };

  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: login,
    onSuccess: handleLoginSuccess, // Passando a função para onSuccess
    onError: (error) => {
      const apiError = error.response?.data as { message?: string; error?: string };
      toast.error(apiError?.message || 'Error logging in.');
    },
  });
};

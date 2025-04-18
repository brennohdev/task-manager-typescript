import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios'; // Importando a instância do axios

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ['current'], 
    queryFn: async () => {
      try {
        const response = await api.get('/user/current'); 
        return response.data; 
      } catch (error) {
        return null; 
      }
    },
  });

  return query;
};

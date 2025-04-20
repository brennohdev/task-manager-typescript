import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/contexts/auth/authStore";

export const useCurrentUser = () => {
  const { setUser } = useAuthStore();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get("/user/current");
      const user = res.data.user;
      setUser(user); 
      return user;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

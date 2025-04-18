import { cookies } from 'next/headers';
import axios from 'axios';

export const fetchUserWorkspaces = async () => {
  const cookieStore = cookies(); // cookies do request
  const session = cookieStore.get('session'); // ajusta o nome do cookie se for outro

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/workspace/all`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
    withCredentials: true,
  });

  return response.data; // deve conter { workspaces: [...] }
};

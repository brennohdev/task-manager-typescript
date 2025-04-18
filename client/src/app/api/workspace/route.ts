import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies(); // pega cookies do request SSR
  const token = cookieStore.get('session'); // ajusta o nome se for diferente

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace`, {
    headers: {
      Cookie: `session=${token?.value}`, // ou Authorization: `Bearer ${token}` se usar JWT
    },
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}

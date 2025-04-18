// src/features/workspace/services/getUserWorkspacesServer.ts
import { workspaceListResponseSchema } from "@/validator/workspaceSchema";

export const getUserWorkspacesServer = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace/all`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userId}`, // ou token se for esse o caso
    },
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  const parsed = workspaceListResponseSchema.parse(data);

  return parsed.workspaces;
};

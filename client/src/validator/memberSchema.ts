import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  profilePicture: z.string().nullable(),
});

export const memberSchema = z.object({
  _id: z.string(),
  userId: userSchema,
  workspaceId: z.string(),
  joinedAt: z.string(), 
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export const getAllMembersResponseSchema = z.object({
  message: z.string(),
  members: z.object({
    members: z.array(memberSchema),
  }),
});

// Inferência de tipo, caso queira usar nos hooks ou funções:
export type GetAllMembersResponse = z.infer<typeof getAllMembersResponseSchema>;

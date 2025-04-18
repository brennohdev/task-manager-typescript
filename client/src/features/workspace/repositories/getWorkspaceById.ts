import { api } from "@/lib/axios";
import { Workspace } from "@/validator/workspaceSchema";

export const getWorkspaceById = async (id: string): Promise<Workspace> => {
    const res = await api.get(`/workspace/${id}`);

    return res.data.workspaceDetails;
}
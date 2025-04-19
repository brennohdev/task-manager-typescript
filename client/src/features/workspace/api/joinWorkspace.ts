import { api } from "@/lib/axios"

export const joinWorkspace = async (inviteCode: string) => {
    const response = await api.post(`/member/workspace/${inviteCode}/join`)

    return response.data as { workspaceId: string};
};
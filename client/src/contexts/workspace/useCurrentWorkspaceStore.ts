import { create } from 'zustand';

interface CurrentWorkspace {
  id: string;
  name: string;
  description: string | null;
}

interface WorkspaceState {
  workspace: CurrentWorkspace | null;
  setWorkspace: (workspace: CurrentWorkspace | null) => void;
  clearWorkspace: () => void;
}

export const useCurrentWorkspaceStore = create<WorkspaceState>((set) => ({
  workspace: null,

  setWorkspace: (workspace) => set({ workspace }),

  clearWorkspace: () => set({ workspace: null }),
}));

import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: string | null;
  currentWorkspace: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

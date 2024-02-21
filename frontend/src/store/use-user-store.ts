import { create } from "zustand";

import { User } from "../utils/store.types";

interface UserState {
  user: User | null;
}

interface UserAction {
  login: (info: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState & UserAction>((set) => ({
  user: null,
  login: ({ ...info }) => set((state) => ({ user: info })),
  logout: () => set({ user: null }),
}));

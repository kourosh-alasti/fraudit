import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "../utils/store.types";

interface UserState {
  user: User | null;
}

interface UserAction {
  login: (info: User) => void;
  logout: () => void;
}
// <UserState & UserAction>
export const useUserStore = create(
  persist<UserState & UserAction>(
    (set, get) => ({
      user: null,
      login: (info) => set({ user: info }),
      logout: () => set({ user: null }),
    }),
    {
      name: "userStorage",
    }
  )
);

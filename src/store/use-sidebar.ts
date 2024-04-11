import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

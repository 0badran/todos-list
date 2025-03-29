import { create } from "zustand"


interface SidebarState {
  isOpen: boolean,
  setIsOpen: (state: boolean) => void
}

export const useSidebarState = create<SidebarState>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({
    isOpen: !state.isOpen
  }))
}));
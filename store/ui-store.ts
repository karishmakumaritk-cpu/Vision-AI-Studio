import { create } from 'zustand';

type UIStore = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  darkMode: true,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode }))
}));

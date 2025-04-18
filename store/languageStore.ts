import { create } from "zustand";

export type Language =
  | "JavaScript"
  | "TypeScript"
  | "Python"
  | "Java"
  | "C++"
  | "C";

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLanguage: "JavaScript",
  setLanguage: (language) => set({ currentLanguage: language }),
}));

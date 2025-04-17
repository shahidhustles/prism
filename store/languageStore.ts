import { create } from "zustand";

export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "csharp"
  | "cpp"
  | "c";

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLanguage: "javascript",
  setLanguage: (language) => set({ currentLanguage: language }),
}));

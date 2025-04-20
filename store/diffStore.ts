import { create } from "zustand";

interface DiffState {
  originalCode: string;
  setOriginalCode: (code: string) => void;
  acceptedChanges: Map<string, string>; // Maps original code to accepted new code
  addAcceptedChange: (originalCode: string, newCode: string) => void;
  getAcceptedChange: (originalCode: string) => string | undefined;
  resetDiffState: () => void;
}

export const useDiffStore = create<DiffState>((set, get) => ({
  originalCode: "",
  setOriginalCode: (code) => set({ originalCode: code }),
  acceptedChanges: new Map<string, string>(),
  addAcceptedChange: (originalCode, newCode) =>
    set((state) => {
      const updatedChanges = new Map(state.acceptedChanges);
      updatedChanges.set(originalCode, newCode);
      return { acceptedChanges: updatedChanges };
    }),
  getAcceptedChange: (originalCode) => get().acceptedChanges.get(originalCode),
  resetDiffState: () => set({ originalCode: "", acceptedChanges: new Map() }),
}));

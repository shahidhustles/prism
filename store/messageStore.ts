import { create } from "zustand";

interface MessageState {
  pendingMessage: string | null;
  isLoading: boolean;
  setPendingMessage: (text: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  resetState: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  pendingMessage: null,
  isLoading: false,
  setPendingMessage: (text) => set({ pendingMessage: text, isLoading: !!text }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  resetState: () => set({ pendingMessage: null, isLoading: false }),
}));

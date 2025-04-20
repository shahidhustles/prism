import { create } from "zustand";

interface MessageState {
  pendingMessage: string | null;
  pendingInput: string | null;
  isLoading: boolean;
  setPendingInput: (text: string | null) => void;
  setPendingMessage: (text: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  resetState: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  pendingMessage: null,
  pendingInput: null,
  setPendingInput: (text) => set({ pendingInput: text, isLoading: !!text }),
  isLoading: false,
  setPendingMessage: (text) => set({ pendingMessage: text, isLoading: !!text }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  resetState: () => set({ pendingMessage: null, pendingInput : null, isLoading: false }),
}));

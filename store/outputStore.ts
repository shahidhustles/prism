import { create } from "zustand";

// Define the interface for our output store state
interface OutputState {
  output: string;
  content: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setOutput: (output: string) => void;
  setContent: (content: string) => void;
  appendOutput: (content: string) => void;
  clearOutput: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Create the store
export const useOutputStore = create<OutputState>((set) => ({
  output: "",
  content: "console.log('hello world')",
  isLoading: false,
  error: null,

  // Implement actions
  setOutput: (output) => set({ output }),
  setContent: (content) => set({ content }),

  appendOutput: (output) =>
    set((state) => ({
      output: state.output + output,
    })),

  clearOutput: () => set({ output: "" }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),
}));

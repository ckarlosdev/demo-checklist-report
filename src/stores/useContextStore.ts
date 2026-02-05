import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppContext {
  jobId: number | null;
  demoChecklistId: number | null;
  isLoaded: boolean;
  setIds: (jobId: number | null, demoChecklistId: number | null) => void;
  setIsLoaded: (loaded: boolean) => void;
}

export const useContextStore = create<AppContext>()(
  persist(
    (set) => ({
      jobId: null,
      demoChecklistId: null,
      isLoaded: false,

      setIds: (jobId, demoChecklistId) => set({ jobId, demoChecklistId }),
      setIsLoaded: (loaded) => set({ isLoaded: loaded }),
    }),
    {
      name: "app-context-storage",
    },
  ),
);

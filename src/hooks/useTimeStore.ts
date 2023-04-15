import { create } from "zustand";

interface TimeStoreState {
  time: number;
  setTime: (time: number) => void;
}

export const useTimeStore = create<TimeStoreState>((set) => ({
  time: 0,

  setTime: (totaltime) => set({ time: totaltime }),
}));

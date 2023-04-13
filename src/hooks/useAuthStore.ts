import { create } from "zustand";
import type { UserData } from "../types";

type State = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
};

export const useAuthStore = create((set) => ({
  userData: { email: "", isStudent: "" },

  setUserData: (userData: UserData) =>
    set((prevState: State) => ({
      userData: { ...prevState.userData, ...userData },
    })),
}));

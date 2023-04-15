import { create } from "zustand";
import type { UserData } from "../types";

type State = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
};

export const emptyUserData: UserData = { email: "", userType: "", quizes: [], scores: [] };

export const useAuthStore = create<State>((set) => ({
  userData: emptyUserData,

  setUserData: (objToUpdate) =>
    set((prevState) => ({
      userData: { ...prevState.userData, ...objToUpdate },
    })),
}));

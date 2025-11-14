import { create } from "zustand";

export const userStore = create((set) => ({
   userData: "caezar",

   setUserData: ((data) => set({ userData: data }))
}))
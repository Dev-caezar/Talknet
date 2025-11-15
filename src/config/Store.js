import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
   persist(
      (set) => ({
         userData: "",
         accessToken: null,

         setUserData: (data) => set({ userData: data }),
         setAccessToken: (token) => set({ accessToken: token }),
      }),
      {
         name: "user-storage",
      }
   )
);

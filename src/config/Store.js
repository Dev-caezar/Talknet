import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
   persist(
      (set) => ({
         userId: null,
         accessToken: null,

         setUserId: (id) => set({ userId: id }),
         setAccessToken: (token) => set({ accessToken: token }),
      }),
      {
         name: "user-storage",
      }
   )
);

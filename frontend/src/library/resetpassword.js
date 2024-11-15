import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useResetPassword = create(persist((set) => ({

    accountReset: null,

    setAccountReset: (account) => set({ accountReset: account }),

})));
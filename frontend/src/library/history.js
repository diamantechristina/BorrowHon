import { create } from "zustand";

export const useHistory = create((set) => ({
    histories: [],

    setHistories: (histories) => set({ histories: histories }),

    fetchHistories: async () => {
        const res = await fetch("/api/histories");
        const data = await res.json();
        set({ histories: data.data });
    },

    createHistory: async (newHistory) => {
        const res = await fetch("/api/histories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            }
        );
        const data = await res.json();
        set((state) => ({
            histories: [...state.histories, data.data],
        }));
        return { success: true, message: "History added successfully." };
    },
}));
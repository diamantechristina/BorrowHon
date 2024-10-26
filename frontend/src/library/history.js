import { create } from "zustand";

export const useHistory = create((set) => ({
    histories: [],

    setHistories: (histories) => set({ histories: histories }),

    createHistory: async (newHistory) => {
        const res = await fetch("/api/history", {
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
    
    fetchHistory: async () => {
        const res = await fetch("/api/history")
        const data = await res.json()
        set({
            history: data.data
        })
    },
}));
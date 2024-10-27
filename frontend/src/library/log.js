import { create } from "zustand";

export const useLog = create((set) => ({
  logs: [],
  setLogs: (logs) => set({ logs: logs }),

  createLog: async (newLog) => {
    const res = await fetch("/api/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLog),
    });
    const data = await res.json();
    set((state) => ({
      log: [...state.logs, data.data],
    }));
    return { success: true, message: "Log added successfully." };
  },

  fetchLogs: async () => {
    const res = await fetch("/api/log");
    const data = await res.json();
    set({
      log: data.data,
    });
  },
}));

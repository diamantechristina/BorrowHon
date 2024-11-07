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
    return { log: data.data,  success: true, message: "Log added successfully." };
  },

  updateLog: async (id, updatedLog) => {
    const res = await fetch(`/api/log/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLog),
    });
    const data = await res.json();
    set((state) => ({
      logs: state.logs.map((log) =>
        log._id === id ? data.data : log
      ),
    }));
    return { success: true, message: "Logs updated successfully." };
  },

  fetchLogs: async () => {
    const res = await fetch("/api/log");
    const data = await res.json();
    set({
      log: data.data,
    });
  },
}));

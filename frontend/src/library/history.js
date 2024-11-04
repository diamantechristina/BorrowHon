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
      body: JSON.stringify(newHistory),
    });
    const data = await res.json();
    set((state) => ({
      history: [...state.histories, data.data],
    }));
    return { success: true, message: "History added successfully." };
  },

  fetchHistory: async () => {
    const res = await fetch("/api/history");
    const data = await res.json();
    set({
      history: data.data,
    });
  },
  deleteHistory: async (id) => {
    const res = await fetch(`/api/history/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    set((state) => ({
      history: state.history.filter((history) => history._id !== id),
    }));
    return { success: true, message: "History deleted successfully." };
  },
  
  updateHistory: async (id, updatedHistory) => {
    const res = await fetch(`/api/history/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHistory),
    });
    const data = await res.json();
    set((state) => ({
      histories: state.histories.map((history) =>
        history._id === id ? data.data : history
      ),
    }));
    return { success: true, message: "History updated successfully." };
  },
}));

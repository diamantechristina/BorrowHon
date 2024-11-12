import { create } from "zustand";

export const useNotification = create((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications: notifications }),

  createNotification: async (newNotification) => {
    const res = await fetch("/api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotification),
    });
    const data = await res.json();
    set((state) => ({
      notifications: [...state.notifications, data.data],
    }));
    return [{ success: true, message: "Notification created successfully." }];
  },

  fetchNotifications: async () => {
    const res = await fetch("/api/notification");
    const data = await res.json();
    set({
      notification: data.data,
    });
  },

  updateNotification: async (id, updatedNotification) => {
    const res = await fetch(`/api/notification/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNotification),
    });
    const data = await res.json();
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification._id === id ? data.data : notification
      ),
    }));
    return { success: true, message: "Notification updated successfully." };
  },

  deleteNotification: async (id) => {
    const res = await fetch(`/api/notification/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    set((state) => ({
      notification: state.notifications.filter(
        (notification) => notification._id !== id
      ),
    }));
    return { success: true, message: "Notification deleted successfully." };
  },
}));

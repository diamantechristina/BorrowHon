import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist((set) => ({
    currentUser: null,
    userLog: null,
    setCurrentUser: (user) => set({ currentUser: user }),
    setLog: (log) => set({ userLog: log }),
    bookData: null,
    setBookData: (data) => set({ bookData: data }),
    isFirstLogin: true,
    setIsFirstLogin: (value) => set({ isFirstLogin: value }),
    isAdmin: false,
    setIsAdmin: (bool) => set({ isAdmin: bool }),
    readerUser: null,
    setReaderUser: (user) => set({ readerUser: user }),
    currentPage: null,
    setCurrentPage: (page) => set({ currentPage: page }),
    setNull: () =>
      set({
        currentUser: null,
        userLog: null,
        bookData: null,
        isFirstLogin: true,
        isAdmin: false,
        readerUser: null,
        currentPage: null,
      }),
  }))
);

import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useStore = create(
    persist(
        (set) => ({
            currentUser: null,
            userLog: null,
            setCurrentUser: (user) => set({ currentUser: user }),
            setLog: (log) => set({ userLog: log }),
            bookData: null,
            setBookData: (data) => set({ bookData: data }),
            isFirstLogin: true,
            setIsFirstLogin: (value) => set({ isFirstLogin: value }),
            searchedBook: null,
            setSearchedBook: (data) => set({ searchedBook: data }),
            filterType: 'title',
            setFilterType: (type) => set({ filterType: type }),
            isAdmin: false,
            setIsAdmin: (bool) => set({ isAdmin: bool}),
            readerUser: null,
            setReaderUser: (user) => set({ readerUser: user }),
            isOnEdit: false,
            setIsOnEdit: (bool) => set({ isOnEdit: bool }),
        })
    )
);
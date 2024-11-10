import { create } from "zustand";


export const useSearch = create(
    
        (set) => ({
            searchedBook: '',
            setSearchedBook: (data) => set({ searchedBook: data }),
            filterType: 'title',
            setFilterType: (type) => set({ filterType: type }),
        })
    
);
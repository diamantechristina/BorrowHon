import { create } from "zustand";
// import { createBook } from "../../../backend/controller/book.controller";

export const useBook = create((set) => ({
    books: [],
    setBooks: (books) => set({ books }),
    
    createBook: async (newBook) => {
        if(!newBook.title || !newBook.author || !newBook.genre || !newBook.isbn || !newBook.description){
            return{success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(newBook)
        })
        const data = await res.json()
        set((state) => ({
            books: [...state.books, data.data],
        }))
        return{success:true, message:"Book added successfully."}
    },
    
    fetchBook: async () => {
        const res = await fetch("/api/books")
        const data = await res.json()
        set({
            books: data.data
        })
    },
}))
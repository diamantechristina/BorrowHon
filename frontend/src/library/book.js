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
        return{success:true, message:"Book added successfully!"}
    },
    
    fetchBook: async () => {
        const res = await fetch("/api/books")
        const data = await res.json()
        set({
            books: data.data
        })
    },

    deleteBook: async (id) => {
        const res = await fetch(`/api/books/${id}`, {
            method: "DELETE",
        })
        const data = await res.json()
        set((state) => ({
            books: state.books.filter((book) => book._id !== id),
        }))
        return {success:true, message:"Book deleted successfully!"}
    },

    updateBook: async (id, updatedBook) => {
        const res = await fetch(`/api/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        })
        const data = await res.json()
        set((state) => ({
            books: state.books.map((book) =>
                book._id === id ? data.data : book
            ),
        }))
        return {success:true, message:"Book updated successfully."}
            }
}))
import Book from "../models/book.model.js";
import mongoose from "mongoose";

export const getBooks = async (req, res) => {
    try{
        const books = await Book.find({});
        res.status(200).json({success: true, data: books})
    } catch (error){
        console.log("Error in getting books: ",error.message)
        res.status(500).json({success: false, message: 'Server error'})
    }
}

export const filterBooks = async (req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).json({success: true, data: books})
    } catch (error){
        console.log("Error in getting books: ",error.message)
        res.status(500).json({success: false, message: 'Server error'})
    }
}

export const createBook = async (req, res) => {
    const book = req.body // getting the data from frontend
    
    if(!book.title || !book.author || !book.genre || !book.isbn || !book.description){
        return res.status(400).json({message: 'Please fill in all fields'})
    }

    const newBook = new Book(book)

    try{
        await newBook.save()
        res.status(201).json({success: true, data: newBook})
    } catch (error){
        console.log("Error in creating book: ",error.message)
        res.status(500).json({success: false, message: 'Server error'})
    }
}

export const updateBook = async (req, res) => {
    const {id} = req.params

    const book = req.body // getting the data from frontend

    const existingBook = await Book.findOne({ isbn: book.isbn, _id: { $ne: id } });
    if (existingBook) {
        return res.status(400).json({ message: 'ISBN already exists' });
    }

    try{
        const updatedBook = await Book.findByIdAndUpdate(id, book, {new:true})
        res.status(200).json({success: true, data: updatedBook})
    } catch(error){
        console.log("Error in updating book: ",error.message)
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

export const deleteBook = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: 'No book found'})
    }

    try{
        await Book.findByIdAndDelete(id)
        res.status(200).json({success: true, message: 'Book deleted successfully'})
    } catch (error){
        console.log("Error in deleting book: ",error.message)
        res.status(500).json({success: false, message: 'Server error'})
    }
}
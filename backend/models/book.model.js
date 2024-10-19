import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    genre:{
        type: [String],
        required: true
    },
    isbn:{
        type: String,
        required: true,
        maxlength: 13,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ['available', 'unavailable', 'borrowed'],
        default: 'available'
    },
    coverImage:{
        type: String,
        required: false
    },
},
{
    timestamps: true // createdAt and updatedAt
})

const Book = mongoose.model('Book', bookSchema)

export default Book
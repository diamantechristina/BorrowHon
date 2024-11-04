import mongoose from "mongoose"
import mongooseSequence from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

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
        enum: ['available', 'unavailable'],
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

bookSchema.plugin(AutoIncrement, {inc_field: 'book_id'})
const Book = mongoose.model('Book', bookSchema)

export default Book
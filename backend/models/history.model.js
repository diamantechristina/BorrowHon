import mongoose from "mongoose"
import AutoIncrement from "mongoose-sequence"

const historySchema = new mongoose.Schema({
    borrow_id:{
        type: Number,
        required: true,
        unique: true
    },
    acc_id:{
        type: Number,
        required: true
    },
    book_id:{
        type: Number,
        required: true
    },
    borrowdate:{
        type: Date,
        default: Date.now,
        required: true
    },
    returndate:{
        type: Date,
        default: Date.now,
        required: true
    }
})

historySchema.plugin(AutoIncrement, {inc_field: 'borrow_id'})

const History = mongoose.model('History', historySchema)

export default History
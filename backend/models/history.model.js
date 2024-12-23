import mongoose from "mongoose"
import mongooseSequence from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

const historySchema = new mongoose.Schema({
    // borrow_id:{
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
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
        required: false
    },
    status:{
        type: String,
        required: true,
        enum: ['pending', 'onhand', 'returned'],
        default: 'pending'
    },
    returndate:{
        type: Date,
        required: false
    }
})

historySchema.plugin(AutoIncrement, {inc_field: 'borrow_id'})

const History = mongoose.model('History', historySchema)

export default History
import mongoose from "mongoose"
import mongooseSequence from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

const notificationSchema = new mongoose.Schema({
    acc_id: {
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    
})

notificationSchema.plugin(AutoIncrement, {inc_field: 'notif_id'})

const Notification = mongoose.model('Notification', notificationSchema)


export default Notification
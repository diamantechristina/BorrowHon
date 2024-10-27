import mongoose from "mongoose"
import AutoIncrement from "mongoose-sequence"

const AutoIncrement = mongooseSequence(mongoose)

const logSchema = new mongoose.Schema({
    acc_id:{
        type: Int,
        required: true
    },
    logindate:{
        type: Date,
        default: Date.now,
        required: true
    },
    logoutdate:{
        type: Date,
        default: Date.now,
        required: false
    }
})

logSchema.plugin(AutoIncrement, {inc_field: 'log_id'})

const Log = mongoose.model('Log', logSchema)

export default Log

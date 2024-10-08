import mongoose from "mongoose"
import AutoIncrement from "mongoose-sequence"

const logSchema = new mongoose.Schema({
    log_id:{
        type: Int,
        required: true,
        unique: true
    },
    user_id:{
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
        required: true
    }
})

logSchema.plugin(AutoIncrement, {inc_field: 'log_id'})

const Log = mongoose.model('Log', logSchema)

export default Log

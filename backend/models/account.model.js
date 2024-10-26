import mongoose from "mongoose"
import mongooseSequence from "mongoose-sequence"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const AutoIncrement = mongooseSequence(mongoose)

const accountSchema = new mongoose.Schema({
    // acc_id:{
    //     type: Number,
    //     unique: true
    // },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true,
        maxlength: 11,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilepic:{
        type: String,
        required: false
    },
    coverpic:{
        type: String,
        required: false
    }
})


accountSchema.plugin(AutoIncrement, {inc_field: 'acc_id'})

accountSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

accountSchema.method.generateToken = async function () {
    const payload = {
        acc_id: this.acc_id,
        username: this.username
    }
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
}

const Account = mongoose.model('Account', accountSchema)

export default Account
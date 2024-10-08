import mongoose from "mongoose"

const credentialSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    }
})

const Credential = mongoose.model('Credential', credentialSchema)

export default Credential
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    firstname: {
        type: String,
        required: true,
        
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    avatar: String,
    address: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('user', userSchema)
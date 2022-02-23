const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        min: [1, "The title must be longer than 1 characters"],
        max: [22, "The title is too long"],
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        min: [1, "The price must be longer than 1 characters"],
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true

    },
    description: String,
    location: String,
    photo: String,
    userId: { type: mongoose.Types.ObjectId, ref: "user" }

})

module.exports = mongoose.model('products', productSchema)
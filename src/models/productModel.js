const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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
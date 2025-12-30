const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    pass: {
        type: Number,
        required: true
    },
    conformpass: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', Userschema);

module.exports = User;
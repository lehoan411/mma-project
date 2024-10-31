const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: 0  // Assuming 0 for default role, adjust as needed
    },
}, {
    timestamps: true
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
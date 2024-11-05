const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    product: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
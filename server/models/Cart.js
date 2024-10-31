const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    product: [
        {
            pid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            pname: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
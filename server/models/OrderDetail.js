const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true  // Assuming true means active, false means completed/cancelled
    },
    customer: {
        uid: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    product: [
        {
            pid: {
                type: String,
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

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
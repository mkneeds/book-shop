const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    user: { type: String, ref: 'User', required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = model('Order', OrderSchema);
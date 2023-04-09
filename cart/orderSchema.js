const { Schema, model } = require('mongoose');
const moment = require('moment');

const OrderSchema = new Schema({
    user: { type: String, ref: 'User', required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now, get: (val) => moment(val).format('DD.MM.YYYY') }
});

module.exports = model('Order', OrderSchema);
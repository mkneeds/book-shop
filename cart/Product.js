const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    image: { data: Buffer, contentType: String },
    imageName: { type: String },
    quantity: { type: Number, default: 0 }
});

const Product = model('Product', ProductSchema);

module.exports = Product;

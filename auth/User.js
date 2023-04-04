const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    birthdate: { type: String },
    image: { data: Buffer, contentType: String },
    imageName: { type: String },
    address: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    cart: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = model('User', UserSchema);

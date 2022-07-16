const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Anlysis = new Schema({
    userName: { type: String, require: true },
    height: { type: Number, require: true },
    weight: { type: Number, require: true },
}, {
    timestamps: true,
})


module.exports = mongoose.model('Anlysis', Anlysis);

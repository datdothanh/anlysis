const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = new Schema({
    className: { type: String, require: true },  
}, {
    timestamps: true,
})


module.exports = mongoose.model('Class', Class);

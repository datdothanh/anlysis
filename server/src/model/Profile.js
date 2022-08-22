const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Profile = new Schema({
    idClass: {type:Schema.Types.ObjectId,ref:'Class' , require: false },
    userName: { type: String, require: true },
    height: { type: Number, require: true },
    weight: { type: Number, require: true },
}, {
    timestamps: true,
})


module.exports = mongoose.model('Profile', Profile);

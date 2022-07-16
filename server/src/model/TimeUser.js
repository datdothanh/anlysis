const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeUser = new Schema({
  
    userName: { type: String, require: true },
    oSName: { type: String, require: true },
    date: { type: Date, require: true },
    useTimeNumber: { type: Number, require: true },
    facebookTimeUse: { type: Number, require: true },
    youtubeTimeUse: { type: Number, require: true },
    other: { type: Number, require: true },
}, {
    timestamps: true,
})


module.exports = mongoose.model('TimeUser', TimeUser);

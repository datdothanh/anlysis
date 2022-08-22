const mongoose = require('mongoose');

async function connect() {
    try {
        // await mongoose.connect('mongodb+srv://admin:qtlKCcrMp264hS2H@cluster0.wlohl.mongodb.net/timesheet?retryWrites=true&w=majority', {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // })
        await mongoose.connect('mongodb://localhost:27017/admin');
        console.log('Connect database successfully!!!')
    } catch (error) {
        console.log('Connect database failed' + error.message);
    }

}


module.exports = { connect };

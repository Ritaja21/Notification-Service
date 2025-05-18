const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MONGODB Connected');
    } catch (err) {
        console.log('MongoDB Connection failed', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
//NotificationDB
const mongoose = require('mongoose');

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/test_project';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectToMongoDB;
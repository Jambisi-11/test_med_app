const mongoose = require('mongoose');

// Suppress the strictQuery warning
mongoose.set('strictQuery', false);

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/stayhealthybeta1";

const connectToMongo = async (retryCount = 0) => {
    const MAX_RETRIES = 3;

    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout
        });
        console.info('✅ Connected to MongoDB Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);

        if (retryCount + 1 >= MAX_RETRIES) {
            console.error('❌ Max retries reached. Exiting process...');
            process.exit(1);
        }

        console.info(`🔄 Retrying... Attempt ${retryCount + 1}`);
        return await connectToMongo(retryCount + 1);
    }
};

// Handle unexpected disconnections
mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
    connectToMongo();
});

mongoose.connection.on('error', (err) => {
    console.error('⚠️ MongoDB error:', err.message);
});

module.exports = connectToMongo;

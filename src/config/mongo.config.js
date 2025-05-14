import mongoose from 'mongoose';

export const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL);

        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection failed: ', err.stack);
        process.exit(1);
    }
};

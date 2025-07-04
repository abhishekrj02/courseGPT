import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        if (connection) {
            console.log(`Connected to database: ${mongoose.connection.host}`)
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;

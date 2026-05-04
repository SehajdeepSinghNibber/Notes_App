import mongoose from 'mongoose';
import config from '../config/config.js';
mongoose.set('bufferCommands', false);

const connectDB = async ()=> {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log(`db connected`)
    } catch (error) {
        console.log(`db not connected`);
        console.log(error)
        // Removed process.exit(1) to keep the server running even if DB fails
    }
}

export default connectDB;   
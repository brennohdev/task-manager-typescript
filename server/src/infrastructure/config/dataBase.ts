import mongoose from 'mongoose';
import { config } from './app';

const connectDataBase = async () => {
    try {
        console.log('Trying to connect to MongoDB with URI:', config.MONGO_URI); // debug
        await mongoose.connect(config.MONGO_URI)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error); // mostra o erro
        process.exit(1);
    }
};

export default connectDataBase;

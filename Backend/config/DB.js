import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        if (!process.env.DB_URI) {
            throw new Error('DB_URI is not defined in environment variables');
        }
        mongoose.connection.on('connected', () => console.log('DB connected'));
        mongoose.connection.on('error', err => console.error('DB error:', err));
        mongoose.connection.on('disconnected', () => {
            console.warn('DB disconnected. Reconnecting...');
            setTimeout(connectDB, 5000);
        });
        await mongoose.connect(process.env.DB_URI);
        console.log('DB is connected');
    } catch (error) {
        console.error('Something went wrong with DB connection: ', error);
    }
};

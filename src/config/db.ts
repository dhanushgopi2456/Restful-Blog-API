import mongoose from 'mongoose';
import logger from '../utils/logger.ts';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    logger.warn('MONGODB_URI is not defined in environment variables.');
    logger.warn('The application is running in "API Only" mode. Database features will not work.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    logger.warn('Please check your MONGODB_URI and ensure your IP is whitelisted.');
  }
};

export default connectDB;

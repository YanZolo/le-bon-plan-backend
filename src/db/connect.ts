import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const startDB = async (url: string) => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log('database connected');
    })
    .catch((err) => console.error(err));
};
export default startDB;


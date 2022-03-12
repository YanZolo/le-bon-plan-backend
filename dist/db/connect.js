import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const startDB = async url => {
  if (!url) {
    throw new Error('database url is undefined');
  }

  await mongoose.connect(url).then(() => {
    console.log('database connected');
  }).catch(err => console.error(err));
};

export default startDB;
//# sourceMappingURL=connect.js.map
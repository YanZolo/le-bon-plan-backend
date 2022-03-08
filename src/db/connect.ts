import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const startDB = async (url: string) => {
  await mongoose
    // .connect(url,{useNewUrlParser: true}) 
    // breaking change in Mongoose 6, this option should be removed in version 6 like below
    .connect(url)
    .then(() => {
      console.log('database connected');
    })
    .catch((err) => console.error(err));
};
export default startDB;

/* mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',(err)=> console.error(err));
db.once('open',() => console.log('database connected')); */

import mongoose from 'mongoose';
interface User {
  username: string;
  email: string;
  password: string;
  createdOn?: string;

}
const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    min: [2, 'The username must be longer than 2 characters'],
    max: [22, 'The username is too long'],
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true
  }
  // lastname: {
  //     type: String,
  //     required: true
  // }, 
  // phone: {
  //     type: String,
  //     required: true
  // },
  // avatar: String,
  // address: String,
  // isAdmin: {
  //     type: Boolean,
  //     default: false
  // }
});

export default mongoose.model('users', userSchema);

import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
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
  isAdmin: {
    type: String,
    default: false
  },
  refreshToken: {
    type: [String]
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true
  }
});
export default mongoose.model('users', userSchema);
//# sourceMappingURL=userModel.js.map
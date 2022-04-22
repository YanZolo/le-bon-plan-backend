import mongoose from 'mongoose';
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: [String],
  createdOn: {
    type: Date,
    default: Date.now,
    required: true
  }
});
export default mongoose.model('admin', adminSchema);
//# sourceMappingURL=adminModel.js.map
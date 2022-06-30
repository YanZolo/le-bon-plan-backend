import mongoose from 'mongoose';

export interface AdminInterface {
  name: String;
  email: String;
  password: String;
  refreshToken?: String[];
  createdOn?: Date;
}

const adminSchema = new mongoose.Schema<AdminInterface>({
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

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false // Never return password hash in queries by default
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['ADMIN', 'MANAGER', 'SUPPORT_AGENT', 'ENGINEER'],
        message: '{VALUE} is not a valid user role'
      },
      default: 'SUPPORT_AGENT'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

// Indexes
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

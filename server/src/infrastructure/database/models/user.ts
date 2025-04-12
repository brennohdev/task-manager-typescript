import mongoose, { Document, Schema } from 'mongoose';
import { hashPassword, comparePassword } from '../../../shared/utils/bcrypt';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  profilePicture?: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  currentWorkspace: mongoose.Types.ObjectId | null;
  comparePassword(value: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, 'password'>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    currentWorkspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.omitPassword = function (): Omit<UserDocument, 'password'> {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.methods.comparePassword = async function (password: string) {
  return await comparePassword(password, this.password);
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;

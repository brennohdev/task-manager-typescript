import mongoose, { Document, Schema } from 'mongoose';
import { generateInviteCode } from '../../../shared/utils/generateInviteCode';

export interface WorkspaceDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  inviteCode: string;
  createdAt: Date;
  updatedAt: Date;
  resetInviteCode: () => void;
}

const workspaceSchema = new Schema<WorkspaceDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      default: generateInviteCode,
    },
  },
  {
    timestamps: true,
  },
);

workspaceSchema.methods.resetInviteCode = function () {
  this.inviteCode = generateInviteCode();
};

const WorkspaceModel = mongoose.model<WorkspaceDocument>('Workspace', workspaceSchema);

export default WorkspaceModel;

import mongoose, { Document, Schema } from 'mongoose';

export interface ProjectDocuments extends Document {
  name: string;
  description: string | null;
  emoji: string;
  workspace: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<ProjectDocuments>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    emoji: {
      type: String,
      required: false,
      trim: true,
      default: '🎯',
    },
    description: {
      type: String,
      required: false,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ProjectModel = mongoose.model<ProjectDocuments>('Project', projectSchema);
export default ProjectModel;

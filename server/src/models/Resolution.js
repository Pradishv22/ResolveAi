import mongoose from 'mongoose';

const resolutionSchema = new mongoose.Schema(
  {
    incidentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Incident',
      required: [true, 'Incident ID is required']
    },
    problem: {
      type: String,
      required: [true, 'Problem description is required'],
      trim: true
    },
    rootCause: {
      type: String,
      required: [true, 'Root cause description is required'],
      trim: true
    },
    resolution: {
      type: String,
      required: [true, 'Resolution description is required'],
      trim: true
    },
    verification: {
      type: String,
      required: [true, 'Verification steps are required'],
      trim: true
    },
    affectedServices: [
      {
        type: String,
        trim: true
      }
    ],
    embedding: {
      type: [Number],
      default: undefined // Vector embedding array for future Atlas Vector Search
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Verifying user is required']
    },
    verifiedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'resolutions'
  }
);

// Indexes
resolutionSchema.index({ incidentId: 1 });
resolutionSchema.index({ verifiedBy: 1 });
resolutionSchema.index({ verifiedAt: -1 });

const Resolution =
  mongoose.models.Resolution || mongoose.model('Resolution', resolutionSchema);

export default Resolution;

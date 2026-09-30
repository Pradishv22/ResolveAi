import mongoose from 'mongoose';

const incidentAiAnalysisSchema = new mongoose.Schema(
  {
    confidence: {
      type: Number,
      min: [0.0, 'Confidence cannot be less than 0.0'],
      max: [1.0, 'Confidence cannot exceed 1.0']
    },
    evidence: [{ type: String, trim: true }],
    alternativeHypotheses: [{ type: String, trim: true }],
    analysisId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AIAnalysis',
      default: null
    }
  },
  { _id: false }
);

const incidentSchema = new mongoose.Schema(
  {
    incidentNumber: {
      type: String,
      required: [true, 'Incident number is required'],
      unique: true,
      uppercase: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Incident title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [300, 'Title cannot exceed 300 characters']
    },
    severity: {
      type: String,
      required: [true, 'Severity is required'],
      enum: {
        values: ['P1', 'P2', 'P3', 'P4'],
        message: '{VALUE} is not a valid incident severity'
      },
      default: 'P3'
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: [
          'DETECTED',
          'INVESTIGATING',
          'IDENTIFIED',
          'FIX_IN_PROGRESS',
          'RESOLVED',
          'POSTMORTEM',
          'CLOSED'
        ],
        message: '{VALUE} is not a valid incident status'
      },
      default: 'DETECTED'
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    affectedServices: [
      {
        type: String,
        trim: true
      }
    ],
    probableRootCause: {
      type: String,
      default: null,
      trim: true
    },
    verifiedRootCause: {
      type: String,
      default: null,
      trim: true
    },
    aiAnalysis: {
      type: incidentAiAnalysisSchema,
      default: null
    },
    relatedTickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
      }
    ],
    assignedEngineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    resolutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resolution',
      default: null
    }
  },
  {
    timestamps: true,
    collection: 'incidents'
  }
);

// Indexes
incidentSchema.index({ status: 1 });
incidentSchema.index({ severity: 1 });
incidentSchema.index({ assignedEngineer: 1 });
incidentSchema.index({ resolutionId: 1 });
incidentSchema.index({ createdAt: -1 });
incidentSchema.index({ status: 1, severity: 1 });

const Incident = mongoose.models.Incident || mongoose.model('Incident', incidentSchema);

export default Incident;

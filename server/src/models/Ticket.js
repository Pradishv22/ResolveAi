import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid customer email']
    }
  },
  { _id: false }
);

const ticketAiAnalysisSchema = new mongoose.Schema(
  {
    summary: { type: String, trim: true },
    sentiment: {
      type: String,
      enum: {
        values: ['POSITIVE', 'NEUTRAL', 'NEGATIVE', 'FRUSTRATED'],
        message: '{VALUE} is not a valid sentiment'
      }
    },
    probableIssue: { type: String, trim: true },
    confidence: {
      type: Number,
      min: [0.0, 'Confidence cannot be less than 0.0'],
      max: [1.0, 'Confidence cannot exceed 1.0']
    },
    model: { type: String },
    promptVersion: { type: String },
    analysisId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AIAnalysis',
      default: null
    }
  },
  { _id: false }
);

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: [true, 'Ticket number is required'],
      unique: true,
      uppercase: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [300, 'Title cannot exceed 300 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: [
          'PAYMENT',
          'AUTHENTICATION',
          'ORDER',
          'DELIVERY',
          'ACCOUNT',
          'PERFORMANCE',
          'BUG',
          'FEATURE_REQUEST',
          'SECURITY',
          'OTHER'
        ],
        message: '{VALUE} is not a valid ticket category'
      },
      default: 'OTHER'
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: {
        values: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        message: '{VALUE} is not a valid ticket priority'
      },
      default: 'MEDIUM'
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: [
          'OPEN',
          'IN_PROGRESS',
          'WAITING_FOR_CUSTOMER',
          'ESCALATED',
          'RESOLVED',
          'CLOSED'
        ],
        message: '{VALUE} is not a valid ticket status'
      },
      default: 'OPEN'
    },
    customer: {
      type: customerSchema,
      required: [true, 'Customer details are required']
    },
    aiAnalysis: {
      type: ticketAiAnalysisSchema,
      default: null
    },
    embedding: {
      type: [Number],
      default: undefined // Kept compatible with future vector search
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    relatedTickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
      }
    ],
    relatedIncidents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Incident'
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  {
    timestamps: true,
    collection: 'tickets'
  }
);

// Indexes
ticketSchema.index({ status: 1 });
ticketSchema.index({ priority: 1 });
ticketSchema.index({ category: 1 });
ticketSchema.index({ assignedTo: 1 });
ticketSchema.index({ createdBy: 1 });
ticketSchema.index({ 'customer.email': 1 });
ticketSchema.index({ createdAt: -1 });
ticketSchema.index({ status: 1, priority: 1 });

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

export default Ticket;

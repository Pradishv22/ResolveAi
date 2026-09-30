import mongoose from 'mongoose';

const retrievedSourceSchema = new mongoose.Schema(
  {
    sourceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    sourceType: {
      type: String,
      enum: {
        values: ['TICKET', 'INCIDENT', 'KNOWLEDGE_DOCUMENT', 'RESOLUTION'],
        message: '{VALUE} is not a valid retrieved source type'
      }
    },
    title: { type: String, trim: true },
    similarityScore: {
      type: Number,
      min: 0.0,
      max: 1.0
    },
    snippet: { type: String, trim: true }
  },
  { _id: false }
);

const tokenUsageSchema = new mongoose.Schema(
  {
    promptTokens: { type: Number, default: 0 },
    completionTokens: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 }
  },
  { _id: false }
);

const aiAnalysisSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      required: [true, 'Entity type is required'],
      enum: {
        values: ['TICKET', 'INCIDENT', 'RESOLUTION', 'QUERY'],
        message: '{VALUE} is not a valid entity type'
      }
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    model: {
      type: String,
      required: [true, 'AI model name is required'],
      trim: true
    },
    promptVersion: {
      type: String,
      required: [true, 'Prompt version is required'],
      trim: true
    },
    confidence: {
      type: Number,
      required: [true, 'Confidence score is required'],
      min: [0.0, 'Confidence score cannot be less than 0.0'],
      max: [1.0, 'Confidence score cannot exceed 1.0']
    },
    summary: {
      type: String,
      required: [true, 'Analysis summary is required'],
      trim: true
    },
    category: {
      type: String,
      default: null,
      trim: true
    },
    priority: {
      type: String,
      default: null,
      trim: true
    },
    sentiment: {
      type: String,
      default: null,
      trim: true
    },
    entities: [
      {
        type: String,
        trim: true
      }
    ],
    probableIssue: {
      type: String,
      default: null,
      trim: true
    },
    retrievedSources: {
      type: [retrievedSourceSchema],
      default: []
    },
    latency: {
      type: Number,
      default: 0 // Latency in milliseconds
    },
    tokenUsage: {
      type: tokenUsageSchema,
      default: () => ({})
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'ai_analyses'
  }
);

// Indexes
aiAnalysisSchema.index({ entityType: 1, entityId: 1 });
aiAnalysisSchema.index({ model: 1 });
aiAnalysisSchema.index({ promptVersion: 1 });
aiAnalysisSchema.index({ timestamp: -1 });

const AIAnalysis =
  mongoose.models.AIAnalysis || mongoose.model('AIAnalysis', aiAnalysisSchema);

export default AIAnalysis;

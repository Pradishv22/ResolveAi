import mongoose from 'mongoose';

const knowledgeMetadataSchema = new mongoose.Schema(
  {
    product: { type: String, trim: true, default: null },
    service: { type: String, trim: true, default: null },
    tags: [{ type: String, trim: true }]
  },
  { _id: false }
);

const knowledgeDocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Document title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [300, 'Title cannot exceed 300 characters']
    },
    type: {
      type: String,
      required: [true, 'Document type is required'],
      enum: {
        values: ['RUNBOOK', 'GUIDE', 'TECHNICAL_DOC', 'FAQ', 'ARTICLE'],
        message: '{VALUE} is not a valid document type'
      },
      default: 'ARTICLE'
    },
    content: {
      type: String,
      required: [true, 'Document content is required']
    },
    status: {
      type: String,
      required: [true, 'Document status is required'],
      enum: {
        values: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
        message: '{VALUE} is not a valid document status'
      },
      default: 'DRAFT'
    },
    source: {
      type: String,
      default: 'MANUAL',
      trim: true
    },
    metadata: {
      type: knowledgeMetadataSchema,
      default: () => ({})
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  {
    timestamps: true,
    collection: 'knowledge_documents'
  }
);

// Indexes
knowledgeDocumentSchema.index({ status: 1 });
knowledgeDocumentSchema.index({ type: 1 });
knowledgeDocumentSchema.index({ 'metadata.service': 1 });
knowledgeDocumentSchema.index({ 'metadata.tags': 1 });
knowledgeDocumentSchema.index({ createdBy: 1 });
knowledgeDocumentSchema.index({ status: 1, type: 1 });
knowledgeDocumentSchema.index({ createdAt: -1 });

const KnowledgeDocument =
  mongoose.models.KnowledgeDocument ||
  mongoose.model('KnowledgeDocument', knowledgeDocumentSchema);

export default KnowledgeDocument;

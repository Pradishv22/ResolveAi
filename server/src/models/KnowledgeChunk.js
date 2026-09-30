import mongoose from 'mongoose';

const chunkMetadataSchema = new mongoose.Schema(
  {
    sourceType: {
      type: String,
      enum: {
        values: ['DOCUMENT', 'TICKET', 'INCIDENT', 'RESOLUTION'],
        message: '{VALUE} is not a valid chunk source type'
      },
      default: 'DOCUMENT'
    },
    sourceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    title: { type: String, trim: true, default: null },
    section: { type: String, trim: true, default: null }
  },
  { _id: false }
);

const knowledgeChunkSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KnowledgeDocument',
      required: [true, 'Document ID is required']
    },
    chunkIndex: {
      type: Number,
      required: [true, 'Chunk index is required'],
      default: 0
    },
    content: {
      type: String,
      required: [true, 'Chunk content is required']
    },
    embedding: {
      type: [Number],
      default: undefined // Vector embedding array for future Atlas Vector Search
    },
    metadata: {
      type: chunkMetadataSchema,
      default: () => ({})
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'knowledge_chunks'
  }
);

// Indexes
knowledgeChunkSchema.index({ documentId: 1, chunkIndex: 1 });
knowledgeChunkSchema.index({ 'metadata.sourceType': 1 });
knowledgeChunkSchema.index({ 'metadata.sourceId': 1 });
knowledgeChunkSchema.index({ createdAt: -1 });

const KnowledgeChunk =
  mongoose.models.KnowledgeChunk || mongoose.model('KnowledgeChunk', knowledgeChunkSchema);

export default KnowledgeChunk;

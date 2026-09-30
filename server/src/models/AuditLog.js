import mongoose from 'mongoose';

const auditActorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    name: {
      type: String,
      default: 'SYSTEM',
      trim: true
    },
    email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true
    },
    role: {
      type: String,
      default: 'SYSTEM'
    }
  },
  { _id: false }
);

const auditLogSchema = new mongoose.Schema(
  {
    actor: {
      type: auditActorSchema,
      required: true,
      default: () => ({})
    },
    action: {
      type: String,
      required: [true, 'Audit action is required'],
      uppercase: true,
      trim: true
    },
    entityType: {
      type: String,
      required: [true, 'Entity type is required'],
      uppercase: true,
      trim: true
    },
    entityId: {
      type: String,
      default: null,
      trim: true
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({})
    },
    ipAddress: {
      type: String,
      default: null,
      trim: true
    },
    userAgent: {
      type: String,
      default: null,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'audit_logs'
  }
);

// Indexes
auditLogSchema.index({ 'actor.userId': 1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ timestamp: -1 });

const AuditLog =
  mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;

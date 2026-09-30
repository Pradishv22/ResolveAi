import mongoose from 'mongoose';

const ticketCommentSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: [true, 'Ticket ID is required']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required']
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true
    },
    isInternal: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: 'ticket_comments'
  }
);

// Indexes
ticketCommentSchema.index({ ticketId: 1, createdAt: 1 });
ticketCommentSchema.index({ author: 1 });

const TicketComment =
  mongoose.models.TicketComment || mongoose.model('TicketComment', ticketCommentSchema);

export default TicketComment;

import test from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';

import {
  User,
  Ticket,
  TicketComment,
  Incident,
  KnowledgeDocument,
  KnowledgeChunk,
  Resolution,
  AIAnalysis,
  AuditLog
} from '../src/models/index.js';

test('Models Phase 2 Test Suite', async (t) => {
  await t.test('1. All 9 Mongoose models are properly exported and registered', () => {
    assert.ok(User, 'User model should be defined');
    assert.ok(Ticket, 'Ticket model should be defined');
    assert.ok(TicketComment, 'TicketComment model should be defined');
    assert.ok(Incident, 'Incident model should be defined');
    assert.ok(KnowledgeDocument, 'KnowledgeDocument model should be defined');
    assert.ok(KnowledgeChunk, 'KnowledgeChunk model should be defined');
    assert.ok(Resolution, 'Resolution model should be defined');
    assert.ok(AIAnalysis, 'AIAnalysis model should be defined');
    assert.ok(AuditLog, 'AuditLog model should be defined');

    assert.strictEqual(User.modelName, 'User');
    assert.strictEqual(Ticket.modelName, 'Ticket');
    assert.strictEqual(TicketComment.modelName, 'TicketComment');
    assert.strictEqual(Incident.modelName, 'Incident');
    assert.strictEqual(KnowledgeDocument.modelName, 'KnowledgeDocument');
    assert.strictEqual(KnowledgeChunk.modelName, 'KnowledgeChunk');
    assert.strictEqual(Resolution.modelName, 'Resolution');
    assert.strictEqual(AIAnalysis.modelName, 'AIAnalysis');
    assert.strictEqual(AuditLog.modelName, 'AuditLog');
  });

  await t.test('2. User Model - validation, enums, and passwordHash protection', async () => {
    // Missing required fields
    const invalidUser = new User({});
    const error = invalidUser.validateSync();
    assert.ok(error, 'Validation should fail on empty user');
    assert.ok(error.errors.name, 'Name is required');
    assert.ok(error.errors.email, 'Email is required');
    assert.ok(error.errors.passwordHash, 'Password hash is required');

    // Invalid role enum
    const invalidRoleUser = new User({
      name: 'Test Agent',
      email: 'agent@example.com',
      passwordHash: '$2b$10$hashedstringvalue',
      role: 'SUPERUSER' // Invalid role
    });
    const roleError = invalidRoleUser.validateSync();
    assert.ok(roleError?.errors?.role, 'Invalid role should be rejected');

    // Invalid email format
    const invalidEmailUser = new User({
      name: 'Test Agent',
      email: 'invalid-email-string',
      passwordHash: '$2b$10$hashedstringvalue',
      role: 'SUPPORT_AGENT'
    });
    const emailError = invalidEmailUser.validateSync();
    assert.ok(emailError?.errors?.email, 'Invalid email format should be rejected');

    // Valid User document
    const validUser = new User({
      name: 'Support Agent Jane',
      email: 'jane@resolveai.internal',
      passwordHash: '$2b$10$hashedvalueforexample',
      role: 'SUPPORT_AGENT'
    });
    const validError = validUser.validateSync();
    assert.strictEqual(validError, undefined, 'Valid user should pass validation');
    assert.strictEqual(validUser.isActive, true, 'Default isActive should be true');

    // Verify passwordHash has select: false
    const passwordHashPath = User.schema.path('passwordHash');
    assert.strictEqual(passwordHashPath.options.select, false, 'passwordHash must have select: false');
  });

  await t.test('3. Ticket Model - schema validation and required fields', async () => {
    // Missing required fields
    const emptyTicket = new Ticket({});
    const error = emptyTicket.validateSync();
    assert.ok(error, 'Empty ticket should fail validation');
    assert.ok(error.errors.ticketNumber, 'ticketNumber is required');
    assert.ok(error.errors.title, 'title is required');
    assert.ok(error.errors.description, 'description is required');
    assert.ok(error.errors.customer, 'customer is required');

    // Invalid priority / status / category
    const invalidEnumsTicket = new Ticket({
      ticketNumber: 'TCK-9999',
      title: 'Valid Title Here',
      description: 'Valid Description Here',
      customer: { name: 'Acme Corp', email: 'contact@acme.com' },
      priority: 'SUPER_URGENT',
      status: 'PENDING_REVIEW',
      category: 'DATABASE'
    });
    const enumError = invalidEnumsTicket.validateSync();
    assert.ok(enumError?.errors?.priority, 'Invalid priority should be rejected');
    assert.ok(enumError?.errors?.status, 'Invalid status should be rejected');
    assert.ok(enumError?.errors?.category, 'Invalid category should be rejected');

    // Valid Ticket with AI analysis subdoc and embedding
    const validTicket = new Ticket({
      ticketNumber: 'TCK-1001',
      title: 'Payment deducted but order is pending',
      description: 'Customer was charged via UPI but order status did not transition to confirmed.',
      category: 'PAYMENT',
      priority: 'HIGH',
      status: 'OPEN',
      customer: {
        name: 'Sarah Connor',
        email: 'sarah@cyberdyne.com'
      },
      aiAnalysis: {
        summary: 'Payment webhook delay',
        sentiment: 'FRUSTRATED',
        probableIssue: 'Redis webhook worker stall',
        confidence: 0.88,
        model: 'gemini-1.5-pro',
        promptVersion: 'ticket-classification-v1'
      },
      embedding: [0.12, 0.45, -0.22, 0.91]
    });
    const validError = validTicket.validateSync();
    assert.strictEqual(validError, undefined, 'Valid ticket should pass validation');
  });

  await t.test('4. TicketComment Model - references and validation', async () => {
    const emptyComment = new TicketComment({});
    const error = emptyComment.validateSync();
    assert.ok(error?.errors?.ticketId, 'Ticket ID is required');
    assert.ok(error?.errors?.author, 'Author is required');
    assert.ok(error?.errors?.content, 'Content is required');

    const validComment = new TicketComment({
      ticketId: new mongoose.Types.ObjectId(),
      author: new mongoose.Types.ObjectId(),
      content: 'Investigating webhook delivery logs for transaction #9281.',
      isInternal: true
    });
    assert.strictEqual(validComment.validateSync(), undefined, 'Valid comment should pass');
    assert.strictEqual(validComment.isInternal, true);
  });

  await t.test('5. Incident Model - validation and lifecycle enum check', async () => {
    // Missing required fields
    const emptyIncident = new Incident({});
    const error = emptyIncident.validateSync();
    assert.ok(error, 'Empty incident should fail validation');
    assert.ok(error.errors.incidentNumber, 'incidentNumber is required');
    assert.ok(error.errors.title, 'title is required');
    assert.ok(error.errors.description, 'description is required');

    // Invalid severity
    const invalidIncident = new Incident({
      incidentNumber: 'INC-100',
      title: 'Payment Service Degradation',
      description: 'Webhook queue processing latency spike.',
      severity: 'P5', // Invalid
      status: 'UNKNOWN_STATUS' // Invalid
    });
    const enumError = invalidIncident.validateSync();
    assert.ok(enumError?.errors?.severity, 'Invalid severity should be rejected');
    assert.ok(enumError?.errors?.status, 'Invalid status should be rejected');

    // Valid Incident
    const validIncident = new Incident({
      incidentNumber: 'INC-342',
      title: 'Payment Gateway Webhook Worker Starvation',
      severity: 'P1',
      status: 'INVESTIGATING',
      description: 'Redis stream consumer group stall causing order confirmation delays.',
      affectedServices: ['payments-worker', 'order-service'],
      probableRootCause: 'Redis stream partition blocking'
    });
    const validError = validIncident.validateSync();
    assert.strictEqual(validError, undefined, 'Valid incident should pass validation');
  });

  await t.test('6. KnowledgeDocument and KnowledgeChunk Models', async () => {
    // KnowledgeDocument validation
    const validDoc = new KnowledgeDocument({
      title: 'Webhook Retry Architecture Guide',
      type: 'RUNBOOK',
      content: 'Detailed recovery instructions for queue stalls.',
      status: 'PUBLISHED',
      source: 'MANUAL',
      metadata: {
        product: 'Core Platform',
        service: 'payment-gateway',
        tags: ['webhooks', 'payments', 'queues']
      }
    });
    assert.strictEqual(validDoc.validateSync(), undefined, 'Valid document should pass');

    // KnowledgeChunk validation
    const validChunk = new KnowledgeChunk({
      documentId: new mongoose.Types.ObjectId(),
      chunkIndex: 0,
      content: 'Webhook retry worker queue tuning parameters...',
      embedding: [0.05, 0.12, 0.88],
      metadata: {
        sourceType: 'DOCUMENT',
        title: 'Webhook Retry Guide',
        section: 'Configuration'
      }
    });
    assert.strictEqual(validChunk.validateSync(), undefined, 'Valid chunk should pass');
  });

  await t.test('7. Resolution, AIAnalysis, and AuditLog Models', async () => {
    // Resolution
    const validResolution = new Resolution({
      incidentId: new mongoose.Types.ObjectId(),
      problem: 'Payment deducted but order remains pending',
      rootCause: 'Webhook worker partition deadlock in Redis consumer group',
      resolution: 'Restarted consumer group workers and updated max delivery timeout',
      verification: 'Verified all 42 pending orders transitioned to CONFIRMED status',
      affectedServices: ['payment-worker'],
      verifiedBy: new mongoose.Types.ObjectId()
    });
    assert.strictEqual(validResolution.validateSync(), undefined, 'Valid resolution should pass');

    // AIAnalysis
    const validAnalysis = new AIAnalysis({
      entityType: 'TICKET',
      entityId: new mongoose.Types.ObjectId(),
      model: 'gemini-1.5-pro',
      promptVersion: 'ticket-classification-v1',
      confidence: 0.89,
      summary: 'Payment webhook delivery stall',
      category: 'PAYMENT',
      priority: 'HIGH',
      latency: 420
    });
    assert.strictEqual(validAnalysis.validateSync(), undefined, 'Valid AIAnalysis should pass');

    // AIAnalysis invalid confidence score (> 1.0)
    const invalidConfidenceAnalysis = new AIAnalysis({
      entityType: 'TICKET',
      model: 'gemini-1.5-pro',
      promptVersion: 'ticket-classification-v1',
      confidence: 1.5, // Invalid > 1.0
      summary: 'Payment summary'
    });
    const confError = invalidConfidenceAnalysis.validateSync();
    assert.ok(confError?.errors?.confidence, 'Confidence > 1.0 must be rejected');

    // AuditLog
    const validLog = new AuditLog({
      actor: {
        userId: new mongoose.Types.ObjectId(),
        name: 'Jane Doe',
        email: 'jane@resolveai.internal',
        role: 'SUPPORT_AGENT'
      },
      action: 'TICKET_ESCALATED',
      entityType: 'TICKET',
      entityId: 'TCK-1001',
      metadata: { previousStatus: 'OPEN', newStatus: 'ESCALATED' },
      ipAddress: '127.0.0.1'
    });
    assert.strictEqual(validLog.validateSync(), undefined, 'Valid AuditLog should pass');
  });

  await t.test('8. Schema Indexes are defined on frequently queried fields', () => {
    // User indexes
    const userIndexFields = User.schema.indexes().map((idx) => Object.keys(idx[0])[0]);
    assert.ok(userIndexFields.includes('role'), 'User should index role');
    assert.ok(userIndexFields.includes('isActive'), 'User should index isActive');

    // Ticket indexes
    const ticketIndexFields = Ticket.schema.indexes().map((idx) => Object.keys(idx[0])[0]);
    assert.ok(ticketIndexFields.includes('status'), 'Ticket should index status');
    assert.ok(ticketIndexFields.includes('priority'), 'Ticket should index priority');
    assert.ok(ticketIndexFields.includes('category'), 'Ticket should index category');
    assert.ok(ticketIndexFields.includes('assignedTo'), 'Ticket should index assignedTo');

    // Incident indexes
    const incidentIndexFields = Incident.schema.indexes().map((idx) => Object.keys(idx[0])[0]);
    assert.ok(incidentIndexFields.includes('status'), 'Incident should index status');
    assert.ok(incidentIndexFields.includes('severity'), 'Incident should index severity');
    assert.ok(incidentIndexFields.includes('assignedEngineer'), 'Incident should index assignedEngineer');

    // Knowledge & Resolution indexes
    const docIndexFields = KnowledgeDocument.schema.indexes().map((idx) => Object.keys(idx[0])[0]);
    assert.ok(docIndexFields.includes('status'), 'KnowledgeDocument should index status');
    assert.ok(docIndexFields.includes('type'), 'KnowledgeDocument should index type');

    const resolutionIndexFields = Resolution.schema.indexes().map((idx) => Object.keys(idx[0])[0]);
    assert.ok(resolutionIndexFields.includes('incidentId'), 'Resolution should index incidentId');

    const auditIndexFields = AuditLog.schema.indexes().map((idx) => Object.keys(idx[0])[0]);
    assert.ok(auditIndexFields.includes('action'), 'AuditLog should index action');
  });
});

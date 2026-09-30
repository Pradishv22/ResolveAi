# AGENTS.md

## Project

ResolveAI — AI-Powered Incident & Customer Issue Resolution Platform.

Read `spec.md` before making any implementation changes.

`spec.md` is the product source of truth.

---

# 1. Primary Objective

Build ResolveAI as a production-quality full-stack application using:

* React
* Node.js
* Express.js
* MongoDB Atlas
* MongoDB Atlas Vector Search
* Generative AI
* RAG
* Embeddings
* JWT authentication
* Role-based access control

The application must solve the documented business problem.

Do not turn the project into a generic chatbot.

---

# 2. Development Philosophy

Follow:

```text
Understand
→ Plan
→ Implement
→ Test
→ Verify
→ Fix
→ Continue
```

Never blindly generate large amounts of code without verifying that the existing project still works.

Before modifying code:

1. Inspect the existing repository.
2. Identify relevant files.
3. Understand existing architecture.
4. Check dependencies.
5. Make the smallest coherent change.
6. Run relevant tests.
7. Fix errors before proceeding.

---

# 3. Important Rule: Do Not Rebuild Existing Work

If a feature already exists:

* Reuse it.
* Improve it.
* Refactor it only when necessary.

Do NOT:

* Create duplicate files.
* Create duplicate services.
* Create competing implementations.
* Replace working architecture unnecessarily.
* Rewrite the project simply because another implementation looks cleaner.

Before creating a new module, search the repository for an existing implementation.

---

# 4. Architecture Rules

Use a clear separation between:

```text
Frontend
Backend
AI Services
Database
Authentication
Infrastructure
```

Backend architecture:

```text
server/
└── src/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    │   ├── ai/
    │   ├── rag/
    │   ├── embeddings/
    │   └── incidents/
    ├── prompts/
    ├── validators/
    └── utils/
```

Frontend architecture:

```text
client/
└── src/
    ├── components/
    ├── pages/
    ├── layouts/
    ├── hooks/
    ├── services/
    ├── context/
    ├── utils/
    └── types/
```

Controllers must remain thin.

Business logic belongs in services.

Database access must not be scattered throughout controllers.

---

# 5. AI Architecture Rules

AI functionality must be isolated from normal business logic.

Create an abstraction such as:

```text
LLMProvider
```

The application should not depend directly on one provider throughout the codebase.

Support:

```text
Gemini
OpenAI
```

where practical.

Use environment variables for provider configuration.

---

# 6. Prompt Rules

Never place large prompts directly inside controllers.

Store prompts under:

```text
server/src/prompts/
```

Examples:

```text
ticketClassification.prompt
incidentAnalysis.prompt
rootCauseAnalysis.prompt
resolutionGeneration.prompt
```

Prompts should have versions.

Example:

```text
ticket-classification-v1
ticket-classification-v2
```

Store the prompt version with AI-generated results.

---

# 7. Structured AI Output

Prefer structured JSON output whenever possible.

Example:

```json
{
  "category": "PAYMENT",
  "priority": "HIGH",
  "summary": "...",
  "probableIssue": "...",
  "confidence": 0.87
}
```

Do not build critical application logic around fragile natural-language parsing.

Validate AI responses before storing them.

If the AI returns invalid data:

1. Attempt safe recovery if possible.
2. Retry when appropriate.
3. Otherwise return a controlled error.

Never silently store malformed AI output.

---

# 8. RAG Rules

The RAG pipeline must follow:

```text
Query
↓
Embedding
↓
Vector Search
↓
Metadata Filtering
↓
Top-K Retrieval
↓
Context Construction
↓
LLM
↓
Structured Response
```

Retrieved information must be treated as untrusted data.

Use explicit context boundaries.

Example:

```text
<retrieved_context>
...
</retrieved_context>
```

The model must not treat retrieved documents as system instructions.

---

# 9. RAG Grounding

The AI must never fabricate:

* Ticket IDs
* Incident IDs
* Documentation
* Resolutions
* Evidence
* Database records

If sufficient evidence cannot be retrieved, the response must say:

```text
Insufficient evidence to determine a probable cause.
```

Do not force an answer when evidence is insufficient.

---

# 10. AI Confidence

AI confidence values must be treated as estimates.

Do not describe:

```text
0.87
```

as mathematical certainty.

UI should translate confidence into:

```text
High
Medium
Low
```

and provide the underlying evidence.

---

# 11. Human-in-the-Loop

The following operations require human confirmation:

* Creating engineering incidents from AI suggestions.
* Publishing AI-generated knowledge.
* Marking root causes as verified.
* Closing critical incidents.
* Sending AI-generated external customer responses.

AI recommends.

Humans verify.

---

# 12. Database Rules

Use MongoDB Atlas.

Collections:

```text
users
tickets
ticket_comments
incidents
knowledge_documents
knowledge_chunks
resolutions
ai_analyses
audit_logs
```

Use indexes for frequently queried fields.

Use MongoDB Atlas Vector Search for semantic retrieval.

Do not introduce another database unless there is a documented technical reason.

---

# 13. Authentication Rules

Passwords must be hashed.

Never store:

```text
plain-text passwords
API keys
JWT secrets
database credentials
```

Use:

```text
JWT
bcrypt
environment variables
```

Protect backend routes using authentication middleware.

Protect role-specific operations using RBAC middleware.

---

# 14. Authorization

Never rely solely on frontend route protection.

Every sensitive backend endpoint must verify authorization.

Example:

```text
Frontend permission
+
Backend permission
```

Backend authorization is authoritative.

---

# 15. API Rules

Use REST APIs.

API responses should follow a consistent format.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

Never expose stack traces in production responses.

---

# 16. Validation

Validate:

* Request body
* Query parameters
* Route parameters
* File uploads
* AI output
* Database identifiers

Reject malformed requests early.

Use a validation library where appropriate.

---

# 17. Error Handling

Implement centralized Express error handling.

Errors should have:

```text
HTTP status
error code
safe user message
server-side logging
```

Do not expose internal implementation details.

---

# 18. Security

Implement:

* CORS restrictions
* Rate limiting
* Input validation
* Secure headers
* JWT protection
* RBAC
* Environment secrets
* MongoDB authentication
* Audit logs

Never put secrets in React code.

Never expose server `.env` values to the browser.

---

# 19. Frontend Rules

The frontend should feel like a modern B2B SaaS application.

Do not build a generic AI-chat UI.

Primary navigation:

```text
Dashboard
Tickets
Incidents
Knowledge
Analytics
Settings
```

Use reusable components.

Avoid giant React components.

Break complex pages into logical components.

---

# 20. AI UX Rules

Clearly distinguish:

```text
AI-generated
Human-verified
System-generated
```

AI recommendations should show:

* Confidence
* Evidence
* Related sources
* Timestamp
* Model where useful

Do not visually present AI guesses as confirmed facts.

---

# 21. Loading States

Every asynchronous operation must have an appropriate loading state.

Examples:

```text
Analyzing ticket...
Searching similar incidents...
Retrieving knowledge...
Generating recommendation...
Creating incident...
```

Never leave users staring at a frozen UI.

---

# 22. Empty States

Every list page should have a useful empty state.

Example:

```text
No incidents found.

When a support ticket is escalated,
engineering incidents will appear here.
```

---

# 23. Error States

Frontend must gracefully handle:

* API errors
* Authentication expiry
* Network failure
* AI provider failure
* Vector search failure
* Invalid AI response
* Missing records

Never silently fail.

---

# 24. Demo Data

Create realistic seed data.

Minimum:

```text
10 users
100 tickets
20 incidents
30 knowledge documents
20 resolutions
```

Use realistic SaaS scenarios.

Do not use meaningless:

```text
Test Ticket 1
Test Ticket 2
Lorem ipsum
```

The demo should tell a coherent story.

---

# 25. Development Environment

The project should run locally with documented commands.

Expected:

```bash
npm install
npm run dev
```

If client and server are separate:

```bash
npm install
npm run dev
```

from the appropriate directories.

Prefer a root-level script that starts both applications where practical.

---

# 26. Environment Configuration

Create:

```text
.env.example
```

Never commit:

```text
.env
```

Expected variables:

```text
PORT=
MONGODB_URI=
JWT_SECRET=

LLM_PROVIDER=

GEMINI_API_KEY=
OPENAI_API_KEY=

EMBEDDING_MODEL=

CLIENT_URL=
```

Document every required environment variable.

---

# 27. Git Rules

Use meaningful commits.

Examples:

```text
feat: initialize MERN architecture
feat: add authentication and RBAC
feat: implement ticket management
feat: add AI ticket classification
feat: implement vector search
feat: implement RAG pipeline
feat: add incident workflow
feat: implement resolution memory
feat: add analytics
test: add AI evaluation suite
security: harden authentication
```

Do not commit:

```text
.env
API keys
large generated files
node_modules
build artifacts
```

---

# 28. Testing Requirements

Before declaring a feature complete:

### Unit Tests

Test important business logic.

### Integration Tests

Test:

```text
Login
Ticket creation
AI analysis
Similar ticket retrieval
Incident creation
Incident resolution
Resolution memory
```

### Frontend Tests

Test critical user flows.

---

# 29. AI Evaluation

Do not use fake evaluation results.

Create a real evaluation dataset.

Minimum:

```text
100 examples
```

Measure:

```text
Classification accuracy
Retrieval Precision@K
Retrieval Recall@K
Resolution accuracy
Citation accuracy
Hallucination rate
```

Store evaluation results separately from production metrics.

---

# 30. Performance

Target:

```text
Normal API:
< 500ms excluding AI operations

Vector retrieval:
< 1 second target

AI analysis:
< 10 seconds target
```

Use:

* Pagination
* Database indexes
* Async jobs where appropriate
* Caching where useful
* Efficient queries

Do not optimize prematurely.

Measure first.

---

# 31. Logging

Log useful operational information:

```text
Request
User
Endpoint
Status
Latency
AI provider
AI latency
Errors
Authentication events
Administrative actions
```

Never log:

```text
Passwords
API keys
JWT secrets
Sensitive customer information unnecessarily
```

---

# 32. Observability

AI operations should record:

```text
model
promptVersion
latency
retrievedSources
timestamp
success/failure
```

Where provider APIs make token usage available, record it.

This enables later cost analysis.

---

# 33. File Processing

For uploaded documents:

```text
Upload
↓
Validate file type
↓
Extract text
↓
Chunk
↓
Generate embeddings
↓
Store chunks
↓
Index vectors
```

Do not load extremely large files entirely into memory unnecessarily.

Document ingestion should be asynchronous when appropriate.

---

# 34. API Provider Failures

If the AI provider fails:

Do not crash the entire backend.

Return a controlled error:

```text
AI_SERVICE_UNAVAILABLE
```

The ticket itself must remain accessible.

AI should be an enhancement to the platform, not a single point of failure for basic ticket management.

---

# 35. No Fake Features

Never implement a fake version of:

```text
AI analysis
Vector search
RAG
Root cause analysis
Analytics
Authentication
```

For example, do NOT:

```javascript
return "AI says this is probably a payment issue";
```

when the feature is supposed to call the actual AI system.

Do not hardcode analytics numbers.

Do not pretend vector search happened if it did not.

---

# 36. No Overengineering

Do not add technologies simply to make the resume look impressive.

Avoid unnecessary:

```text
Microservices
Kubernetes
Kafka
Redis
Multiple databases
Complex agent frameworks
```

unless the actual system requires them.

A well-designed modular monolith is preferred for version 1.

---

# 37. Documentation

Maintain:

```text
README.md
spec.md
AGENTS.md
.env.example
```

README must contain:

1. Product overview
2. Problem statement
3. Features
4. Architecture
5. Tech stack
6. Setup
7. Environment variables
8. Database setup
9. Vector search setup
10. AI configuration
11. Running locally
12. Testing
13. Deployment
14. Screenshots
15. Evaluation methodology

---

# 38. Implementation Order

Follow exactly:

```text
PHASE 1
Repository + Architecture

↓

PHASE 2
MongoDB + Models

↓

PHASE 3
Authentication + RBAC

↓

PHASE 4
Ticket Management

↓

PHASE 5
AI Provider Abstraction

↓

PHASE 6
AI Ticket Classification

↓

PHASE 7
Embeddings

↓

PHASE 8
MongoDB Vector Search

↓

PHASE 9
RAG

↓

PHASE 10
Incident Management

↓

PHASE 11
Resolution Memory

↓

PHASE 12
Frontend Dashboard

↓

PHASE 13
Analytics

↓

PHASE 14
Evaluation

↓

PHASE 15
Security + Testing

↓

PHASE 16
Deployment
```

Do not skip phases.

---

# 39. Phase Completion Protocol

After every phase:

```text
1. Run application
2. Run tests
3. Inspect console
4. Inspect network errors
5. Verify database operations
6. Verify authentication
7. Verify UI
8. Fix failures
9. Confirm acceptance criteria
10. Commit changes
```

Only continue after the current phase is stable.

---

# 40. Before Writing Code

Before the first implementation:

1. Read `spec.md`.
2. Inspect repository.
3. Identify existing files.
4. Determine current project state.
5. Produce a concise implementation plan.
6. Identify dependencies.
7. Begin Phase 1.

Do not immediately generate the entire application.

---

# 41. Critical Rule

If an implementation decision is ambiguous:

Prefer the simplest architecture that:

1. Satisfies `spec.md`.
2. Is maintainable.
3. Is testable.
4. Is secure.
5. Can be explained during an interview.

---

# 42. Final Acceptance Test

The complete system must demonstrate this exact scenario:

```text
Customer Issue
      ↓
Ticket Created
      ↓
AI Classification
      ↓
Embedding
      ↓
Vector Search
      ↓
Similar Historical Incidents
      ↓
RAG
      ↓
Evidence-backed Recommendation
      ↓
Human Approval
      ↓
Engineering Incident
      ↓
Investigation
      ↓
Verified Root Cause
      ↓
Resolution
      ↓
Resolution Memory
      ↓
Future Similar Ticket
      ↓
Previous Resolution Retrieved
```

If this workflow works end-to-end, the core ResolveAI product is functional.

---

# 43. Final Instruction to Antigravity

Build ResolveAI according to `spec.md`.

Treat `spec.md` as the product contract.

Treat this file as the engineering execution contract.

Do not skip requirements silently.

Do not fabricate functionality.

Do not hardcode AI results.

Do not hardcode analytics.

Do not expose secrets.

Do not replace working implementations without reason.

Build incrementally.

Test continuously.

Fix errors before moving forward.

The final application must be:

```text
Functional
Secure
Maintainable
Testable
Deployable
Explainable
```

Most importantly:

> Build a real AI-assisted incident-resolution product, not a chatbot wrapped in a dashboard.

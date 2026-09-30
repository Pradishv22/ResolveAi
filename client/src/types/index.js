/**
 * JSDoc Type Definitions for ResolveAI Frontend
 * Aligned with spec.md
 */

/**
 * @typedef {'ADMIN' | 'MANAGER' | 'SUPPORT_AGENT' | 'ENGINEER'} UserRole
 */

/**
 * @typedef {'OPEN' | 'IN_PROGRESS' | 'WAITING_FOR_CUSTOMER' | 'ESCALATED' | 'RESOLVED' | 'CLOSED'} TicketStatus
 */

/**
 * @typedef {'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'} TicketPriority
 */

/**
 * @typedef {'DETECTED' | 'INVESTIGATING' | 'IDENTIFIED' | 'FIX_IN_PROGRESS' | 'RESOLVED' | 'POSTMORTEM' | 'CLOSED'} IncidentStatus
 */

/**
 * @typedef {'P1' | 'P2' | 'P3' | 'P4'} IncidentSeverity
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 * @property {string} [avatar]
 */

export {};

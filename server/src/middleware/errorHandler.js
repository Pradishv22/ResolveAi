import { config } from '../config/env.js';

export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_SERVER_ERROR', details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 404 Not Found handler
export const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Cannot ${req.method} ${req.originalUrl}`, 404, 'NOT_FOUND');
  next(error);
};

// Centralized error handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred.';

  // Log error details for debugging
  if (statusCode >= 500) {
    console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);
  } else {
    console.warn(`[WARN] ${req.method} ${req.originalUrl} (${statusCode}): ${message}`);
  }

  const response = {
    success: false,
    error: {
      code,
      message,
      ...(err.details ? { details: err.details } : {})
    }
  };

  // Only include stack in development mode for 500 errors
  if (config.env === 'development' && statusCode >= 500 && err.stack) {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

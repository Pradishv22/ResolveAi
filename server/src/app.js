import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        config.clientUrl,
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:3000'
      ];

      if (allowedOrigins.includes(origin) || config.env === 'development') {
        return callback(null, true);
      }
      return callback(new Error('CORS not allowed for this origin'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(requestLogger);

// Base API route
app.use('/api', apiRoutes);

// Root fallback
app.get('/', (req, res) => {
  res.json({
    name: 'ResolveAI API',
    status: 'online',
    documentation: '/docs',
    healthCheck: '/api/health'
  });
});

// 404 & Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

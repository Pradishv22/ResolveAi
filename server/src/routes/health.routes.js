import express from 'express';
import { getDatabaseStatus } from '../config/db.js';
import { config } from '../config/env.js';

const router = express.Router();

router.get('/', (req, res) => {
  const dbStatus = getDatabaseStatus();

  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      service: 'ResolveAI API',
      version: '1.0.0',
      environment: config.env,
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      database: dbStatus
    }
  });
});

export default router;

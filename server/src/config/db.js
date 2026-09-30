import mongoose from 'mongoose';
import { config } from './env.js';

let isConnected = false;

export const connectDatabase = async () => {
  const uri = config.mongoUri;

  if (!uri) {
    console.warn('⚠️  MONGODB_URI is not set in environment variables. Database features will be unavailable.');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // 5s timeout so startup is not hung if DB is unreachable
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.warn('⚠️  Server will continue running in degraded mode without database.');
    return null;
  }
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('⚡ MongoDB disconnected cleanly.');
  }
};

mongoose.connection.on('connected', () => {
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  console.error('❌ MongoDB runtime error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('⚠️  MongoDB disconnected.');
});

export const getDatabaseStatus = () => {
  const stateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized'
  };

  const readyState = mongoose.connection.readyState;
  return {
    state: stateMap[readyState] || 'unknown',
    isConnected: readyState === 1,
    hasUriConfigured: Boolean(config.mongoUri)
  };
};

export const checkDatabaseHealth = async () => {
  const status = getDatabaseStatus();
  if (!status.isConnected) {
    return {
      healthy: false,
      ...status
    };
  }

  try {
    const adminDb = mongoose.connection.db.admin();
    const pingResult = await adminDb.ping();
    return {
      healthy: pingResult?.ok === 1,
      ...status,
      host: mongoose.connection.host,
      name: mongoose.connection.name
    };
  } catch (err) {
    return {
      healthy: false,
      ...status,
      error: err.message
    };
  }
};

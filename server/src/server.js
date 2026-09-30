import app from './app.js';
import { config } from './config/env.js';
import { connectDatabase } from './config/db.js';

const PORT = config.port;

const startServer = async () => {
  // Attempt database connection (graceful fallback if unreachable)
  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 ResolveAI API running on port ${PORT}`);
    console.log(`🌍 Environment: ${config.env}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    console.log(`=========================================`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('\n🛑 Shutting down ResolveAI API gracefully...');
    server.close(() => {
      console.log('⚡ HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});

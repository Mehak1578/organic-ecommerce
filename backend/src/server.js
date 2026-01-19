// Environment variables are loaded in app.js via env.js
import app from './app.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 5000;

process.on('unhandledRejection', (err) => {
  console.error('Unhandled promise rejection:', err.message);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err.message);
});

connectDB().then((connected) => {
  if (!connected) {
    console.log('\n⚠️  IMPORTANT: Fix MongoDB connection to enable authentication features');
    console.log('📝 See: https://www.mongodb.com/docs/atlas/security-whitelist/\n');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🌱 Environment: ${process.env.NODE_ENV || 'development'}`);
});

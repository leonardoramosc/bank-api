import app from './app';
import { DBConn } from './database';

DBConn.sync().then(() => {
  const server = app.listen(app.get('port'), () => {
    console.log(`server listen on port: ${app.get('port')}`)
  });

  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
});
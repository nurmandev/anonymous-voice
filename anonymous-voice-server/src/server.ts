/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';

import config from './config/index';
import { errorlogger, logger } from './shared/logger';
import { initializeSocket } from './sockets/socket';
import app from './app';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});


let server: Server;



async function bootstrap() {
  try {
     await mongoose.connect(config.database_url as string);
    // await mongoose.connect("mongodb+srv://crmAdmin:vqtdVpU9nt9XgmJA@cluster0.a4iwm.mongodb.net/?retryWrites=true&w=majority");
    // logger.info(`🛢   Database is connected successfully`);
    console.log(`🛢   Database is connected successfully`);
// Create HTTP server from Express app
    server = app.listen(config.port, () => {
      // logger.info(`Application  listening on port ${config.port}`);
      console.log(`Application  listening on port ${config.port}`);
    });

     // Initialize Socket.IO
     initializeSocket(server);
    

  } catch (err) {
    errorlogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});

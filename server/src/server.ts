import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { meiliClient } from './app/utils/meiliSearch';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`my app is listening on port ${config.port}`);
    });
    // const index = meiliClient.index('rooms');
    // index
    //   .deleteAllDocuments()
    //   .then((res) => console.log(res))
    //   .catch((err) => console.error(err));
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});

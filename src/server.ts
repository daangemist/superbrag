import 'dotenv/config';
import express from 'express';
import db from './db';
import http from './http';

async function main() {
  try {
    const app = express();
    const port = process.env.PORT || 3000;

    // Initialize the db
    await db();

    http(app);
    app.listen(port, () => {
      console.log(`superbrag listening at http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error('Error while starting superbrag.', error);
    process.exit(5);
  }
}

main();

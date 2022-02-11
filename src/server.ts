import express from 'express';
import { getConfig, loadConfig } from './config';
import { initialize } from './db';
import http from './http';

async function main() {
  try {
    // load the configuration
    try {
      await loadConfig();
    } catch (error) {
      console.log(error);
      throw new Error(
        'Unable to load config.json, did you copy it from config.json.dist at installation?'
      );
    }

    const config = getConfig();
    const app = express();

    // Initialize the db
    await initialize(config.apiEnabled ? app : undefined);

    http(app);
    app.listen(config.port, () => {
      console.log(`superbrag listening at http://0.0.0.0:${config.port}`);
    });
  } catch (error) {
    console.error('Error while starting superbrag.', error);
    process.exit(5);
  }
}

main();

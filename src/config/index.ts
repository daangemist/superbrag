import path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
import { Config } from '../types';

const readFileAsync = promisify(readFile);

let config: Config = {
  connectionString: process.env.DB ?? 'sqlite://db.sqlite',
  apiEnabled: process.env.API_ENABLED === 'true',
  title: 'Superbrag',
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  accessPassword: process.env.ACCESS_PASSWORD ?? '',
  sessionSecret: process.env.SESSION_SECRET ?? '',
};

export const getConfig = () => config;

export const loadConfig = async () => {
  try {
    // optionally read a local config.json file.
    const configFile =
      process.env.CONFIG_FILE ?? path.join(__dirname, '../../config.json');
    const rawConfig = await readFileAsync(configFile);
    const jsonConfig = JSON.parse(rawConfig.toString());
    config = { ...config, ...jsonConfig };
  } catch (error) {
    console.log(
      'Could not read config.json file for additional configuration.'
    );
  }

  if (!config.accessPassword || !config.sessionSecret) {
    throw new Error('Access password or session secret are not configured.');
  }
};

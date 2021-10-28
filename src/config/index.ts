import { Config } from "../types";
import path from 'path';

let config: Config = {
  title: 'Superbrag',
  port: 3000,
  accessPassword: '',
  sessionSecret: '',
  avatar: '',
}

export const getConfig = () => config;

export const loadConfig = async () => {
  const { default: loadedConfig } = await import(path.join(__dirname, '../../config.json'));
  config = loadedConfig;
}

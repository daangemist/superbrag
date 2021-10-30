import jwt from 'jsonwebtoken';
import { getConfig } from '../config';

export function generate(): string {
  return jwt.sign({}, getConfig().sessionSecret, { expiresIn: '60 days' });
}

export function verify(token: string): boolean {
  try {
    jwt.verify(token, getConfig().sessionSecret);
    return true;
  } catch (err) {
    console.log('Unable to verify token.', err);
    return false;
  }
}

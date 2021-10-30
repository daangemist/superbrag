import { Request, Response } from 'express';
import { getConfig } from '../../../config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function allowList(req: Request, res: Response, next: any): void {
  if (!getConfig().ipsAllowed) {
    next();
    return;
  }

  let remoteIp = req.ip;
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    if (Array.isArray(forwardedFor)) {
      remoteIp = forwardedFor[0];
    } else {
      remoteIp = forwardedFor.trim();
    }
  }

  const allowedIps = (getConfig().ipsAllowed as string).split(',');
  if (allowedIps.indexOf(remoteIp) !== -1) {
    next();
    return;
  }

  console.log('Blocked ip', remoteIp, 'from accessing.');
  res.status(401).send('Not allowed.');
}

import { Express } from 'express';
import session from 'express-session';
import memoryStore from 'memorystore';

export default function (app: Express) {
  // Initialize the session
  const MemoryStore = memoryStore(session);
  app.use(
    '/',
    session({
      cookie: { maxAge: 86400000 * 7 },
      store: new MemoryStore({
        checkPeriod: 86400000 * 7, // prune expired entries every 7 days
      }),
      resave: false,
      secret: process.env.SESSION_SECRET || 'replace-me',
      saveUninitialized: false,
    })
  );
}

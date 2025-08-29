import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from "helmet";
import { auth } from 'express-oauth2-jwt-bearer';
import ViteExpress from 'vite-express';
import { Request, Response, NextFunction } from 'express';

const app = express();

const isDevelopment = app.get("env") === "development";
const TENANT = process.env.VITE_TENANT || 'common';
const AUDICENCE = process.env.VITE_AUDIENCE || '';
const PORT = process.env.VITE_PORT || '5173';
const HOST = process.env.VITE_HOST || 'http://localhost:5173'

app.use(cors({
    origin: HOST,
  }
));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": isDevelopment ? ["'self'", "'unsafe-inline'"] : ["'self'"],
      "connect-src": ["'self'", "login.microsoftonline.com"],
      "upgrade-insecure-requests": isDevelopment ? null : [],
    },
  }),
);

const requiresAuth = auth({
  issuerBaseURL: `https://login.microsoftonline.com/${TENANT}/v2.0`,
  audience: AUDICENCE!,
});

app.post('/api', requiresAuth, (_, res) => res.send({ response: 'Authorized' }));

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ response: 'Unauthorized' });
  } else {
    next(err);
  }
});

ViteExpress.listen(app, parseInt(PORT), () => console.log(`Server is listening on port ${PORT}`));

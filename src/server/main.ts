import 'dotenv/config';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import ViteExpress from 'vite-express';

const app = express();

const requiresAuth = auth({
  issuerBaseURL: `https://login.microsoftonline.com/${process.env.VITE_TENANT}/v2.0`,
  audience: process.env.VITE_AUDIENCE!,
});

app.post('/api', requiresAuth, (_, res) => res.send({ response: 'Hello from express!' }));

ViteExpress.listen(app, 5173, () => console.log('Server is listening...'));

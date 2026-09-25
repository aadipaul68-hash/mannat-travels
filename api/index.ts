import { createApiApp } from '../src/server/api-app.ts';

// Vercel routes every /api/* request (see vercel.json rewrites) to this
// serverless function. An Express app is itself a (req, res) handler, so it can
// be exported directly and will match the original /api/... path.
const app = createApiApp();

export default app;

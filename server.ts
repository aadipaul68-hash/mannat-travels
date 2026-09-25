import express from 'express';
import { createServer as createHttpServer } from 'http';
import { createServer as createViteServer } from 'vite';
import { createApiApp } from './src/server/api-app.ts';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function startServer() {
  // Reuse the exact same API app that runs as a Vercel serverless function in
  // production, so dev and prod share identical route behavior.
  const app = createApiApp();
  const httpServer = createHttpServer(app);
  const port = process.env.PORT || 3000;

  // Mount Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        // Attach Vite's HMR WebSocket to the shared Express HTTP server so it
        // rides on the same (proxied) port as the page instead of Vite's
        // default standalone port 24678, which the preview proxy doesn't
        // expose. Without this the client's @vite/client socket "closes
        // without opening". In Vite 8 the parent server must be provided via
        // `server.ws.server` (this is what sets `wsCustomServer` internally);
        // `middlewareMode.server` and the old `hmr.server` do not bind it.
        ws: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();

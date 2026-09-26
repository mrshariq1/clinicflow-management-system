import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Ensure dist build exists
if (!fs.existsSync(indexPath)) {
  try {
    console.log('Dist build not found, building production bundle...');
    execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
  } catch (err) {
    console.error('Failed to auto-build dist:', err);
  }
}

// Serve static assets from Vite dist
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: '1d' }));
}

// Health check endpoints for Cloud Run & load balancers
app.get(['/healthz', '/_healthz', '/api/health'], (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Single Page Application (SPA) catch-all route: serve index.html
app.get('*', (_req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('ClinicFlow is initializing...');
  }
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`ClinicFlow server listening on http://0.0.0.0:${PORT}`);
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`Port ${PORT} in use, trying fallback port 3000...`);
    app.listen(3000, '0.0.0.0', () => {
      console.log(`ClinicFlow fallback listening on http://0.0.0.0:3000`);
    });
  } else {
    console.error('Server error:', err);
  }
});

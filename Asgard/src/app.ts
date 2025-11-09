import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import os from 'os';
import { exec } from 'child_process';
import { getCpuUsage } from './controllers/cpu';

const app = express();

app.use(express.json());

// Routes
// app.use("/api/items", itemRoutes);
app.get('/api/health', async (_, res) => {
  const uptimeSeconds = os.uptime();
  const cpuUsage = await getCpuUsage();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  res.status(200).json({
    status: 'OK',
    uptime: uptimeSeconds,
    cpuUsage,
    totalMemory,
    freeMemory,
  });
});

app.get('/api/shutdown', (_, res) => {
  res.status(200).json({ message: 'Server is shutting down' });
  exec('sudo shutdown now', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing shutdown: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Shutdown stderr: ${stderr}`);
      return;
    }
    console.log(`Shutdown stdout: ${stdout}`);
  });
  process.exit(0);
});

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;

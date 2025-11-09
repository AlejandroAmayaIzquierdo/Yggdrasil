import os from 'os';

export async function getCpuUsage() {
  const cpus1 = os.cpus();

  return new Promise((resolve) => {
    setTimeout(() => {
      const cpus2 = os.cpus();
      const usage = cpus2.map((cpu, idx) => {
        const t1 = cpus1[idx].times;
        const t2 = cpu.times;

        const idleDiff = t2.idle - t1.idle;
        const totalDiff =
          t2.user -
          t1.user +
          t2.nice -
          t1.nice +
          t2.sys -
          t1.sys +
          t2.idle -
          t1.idle +
          t2.irq -
          t1.irq;

        const percent = 100 - (100 * idleDiff) / totalDiff;
        return percent;
      });

      const avgUsage = usage.reduce((acc, val) => acc + val, 0) / usage.length;

      resolve(avgUsage.toFixed(2)); // CPU usage in %
    }, 100);
  });
}

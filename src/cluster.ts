/** cluster.js * */
import cluster from 'cluster';
import os from 'os';

import server from './app';

if (cluster.isPrimary) {
  const numberOfCPUs = os.cpus().length;

  console.log(`Master ${process.pid} is running`);
  console.log(`Forking Server for ${numberOfCPUs} CPUs\n`);
  // Create a Worker Process for each Available CPU
  for (let index = 0; index < numberOfCPUs; index += 1) {
    cluster.fork();
  }
  // When Worker process has died, Log the worker
  cluster.on('exit', (worker, code, signal) => {
    /**
     * The condition checks if worker actually crashed and
     * wasn't manually disconnected or killed by master process.
     *
     * The condition can be changed by desired error code,
     * and condition.
     */
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died`);
      console.log(`Signal ${signal}`);
      cluster.fork();
    }
  });
} else {
  // if Worker process, master is false, cluster.isWorker is true
  // worker starts server for individual cpus
  // the worker created above is starting server
  server.listen(process.env.PORT, () => {
    console.log('Server running on port %d', process.env.PORT);
  });
}

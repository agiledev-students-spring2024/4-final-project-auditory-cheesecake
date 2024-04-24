const cron = require('node-cron');
const Semaphore = require('semaphore');
const app = require('./app.js');
const connectDatabase = require('./database');
const { sync, flushExpiredSessions } = require('./utility/SessionUtility.js');

const PORT = process.env.PORT || 1337;

// instantiate mutex
const mutex = Semaphore(1);

// hourly cache cleanup and sync task
cron.schedule('0 * * * *', () => {
  // mutex ensures that only one job runs at a time
  mutex.take(async () => {
    await flushExpiredSessions();
    console.log('Hourly session flush executed.');
    mutex.leave();
  });
}, {
  scheduled: true,
  timezone: "America/New_York"
});

// daily synchronization of cache at midnight
cron.schedule('0 0 * * *', () => {
  // mutex ensures that only one job runs at a time
  mutex.take(async () => {
    await sync();
    console.log('Daily synchronization complete');
    mutex.leave();
  });
}, {
  scheduled: true,
  timezone: "America/New_York"
});

connectDatabase();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
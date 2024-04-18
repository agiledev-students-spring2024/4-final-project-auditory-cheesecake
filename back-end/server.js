// Change from CommonJS to ES Modules syntax

const sessionCache = require('./classes/SessionCache.js');
const app = require('./app.js');
const PORT = process.env.PORT || 1337;

const connectDatabase = require('./database');
// Setup cleanup task
setInterval(() => {
  sessionCache.clearExpiredSessions();
}, 3600000);


connectDatabase();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
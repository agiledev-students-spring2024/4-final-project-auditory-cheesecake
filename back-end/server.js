// Change from CommonJS to ES Modules syntax

const app = require('./app.js');
const PORT = process.env.PORT || 1337;

const connectDatabase = require('./database');

connectDatabase();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const mongoose = require('mongoose');
const { sync } = require('./utility/SessionUtility');

const connectDatabase = () => {
  mongoose.connect('mongodb+srv://cheese1:AuditoryCheesecake@auditorycheesecake.jtoc5ey.mongodb.net/?retryWrites=true&w=majority&appName=AuditoryCheesecake')
    .then(async () => {
      console.log('MongoDB connected...');
      //For tests, remove await sync() 
      if (process.env.NODE_ENV !== 'test') {
        await sync();
      }
    })
    .catch(err => {
      console.error(err);
      // exit process w/ failure
      process.exit(1);
    });
};

module.exports = connectDatabase;

const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect('mongodb+srv://cheese1:AuditoryCheesecake@auditorycheesecake.jtoc5ey.mongodb.net/?retryWrites=true&w=majority&appName=AuditoryCheesecake')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));
};

module.exports = connectDatabase;

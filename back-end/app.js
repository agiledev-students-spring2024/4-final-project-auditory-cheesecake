require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cors()); 

const surveyRoutes = require('./routes/survey');
app.use('/api', surveyRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


//connect to MongoDB
//mongoose.connect('url',;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app; 
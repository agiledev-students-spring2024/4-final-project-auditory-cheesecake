require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const surveyController = require('./controllers/survey');

const app = express();

//const PORT = process.env.PORT || 1337;

app.use(express.json()); 
app.use(cors()); 

const surveyRoutes = require('./routes/survey');
app.use('/api', surveyRoutes);

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.get('/api/survey/responses', surveyController.getSurveyResponses);
/* Test Route
app.get('/', (req, res) => {
    res.send('Backend is running');
  });
  */
  

//connect to MongoDB
//mongoose.connect('url',;


// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app; 
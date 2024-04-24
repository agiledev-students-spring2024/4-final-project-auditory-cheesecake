require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const surveyController = require('./controllers/survey');

const app = express();

//const PORT = process.env.PORT || 1337;

app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors()); 

app.use(express.static(path.join(__dirname, 'public')));


const surveyRoutes = require('./routes/survey');
app.use('/api', surveyRoutes);

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const userRoutes = require('./routes/user');
app.use('/api', userRoutes);

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
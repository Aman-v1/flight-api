const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { notFound, globalErrHandler } = require('./Middlewares/globalErrHandler');

const app = express();

const flightRoutes = require('./Routes/flightRoutes');
const userRoutes = require('./Routes/userRoutes');
const flightPathRoutes = require('./Routes/flightPathRoutes');

dotenv.config();
const { Connection } = require('./config/db');

const Port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up routes
app.use('/api/flights', flightRoutes);
app.use('/api/users', userRoutes);
app.use('/api/flightPaths', flightPathRoutes);

app.get('/', (req, res) => {
  res.status(200).json('HomePage');
});

//err middleware
app.use(notFound);
app.use(globalErrHandler);

// Set up database connection
Connection();

// Start server

app.listen(Port, () => {
  console.log('Server running on port ' + Port + ' Successfully.....');
});
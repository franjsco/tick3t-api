import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import users from './routes/users';
import privateUsers from './routes/PrivateUsers';
import privateTickets from './routes/PrivateTickets';
import categories from './routes/categories';
import tickets from './routes/tickets';
import authentication from './helpers/authentication';

const mongoose = require('./config/database');

const app = express();

<<<<<<< HEAD
app.set('secretKey', 'ciccio'); // sostituire con variabili ambiente (env)
app.disable('etag');
=======
app.set('secretKey', 'ciccio'); // sostituire con variabili ambiente
>>>>>>> 32333cc9f65fbfb1b2804906d69a379ea71010c0

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
<<<<<<< HEAD
=======
app.disable('etag');

>>>>>>> 32333cc9f65fbfb1b2804906d69a379ea71010c0
app.use(cors());

// routes
app.use('/api/users', users);
app.use('/api/tickets', tickets);
app.use('/api/categories', categories);

// private routes
app.use('/api/tickets', authentication, privateTickets);
app.use('/api/users', authentication, privateUsers);

// listen
app.listen(3001, () => {
  console.log('Server started');
});

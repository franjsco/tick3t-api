import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import logger from './logger';
import users from './routes/users';
import privateUsers from './routes/PrivateUsers';
import privateTickets from './routes/PrivateTickets';
import categories from './routes/categories';
import tickets from './routes/tickets';
import authentication from './helpers/authentication';

require('dotenv').config();

const {
  DB_URL,
  DB_USER,
  DB_PASSWORD,
  SECRET_KEY,
  PORT,
} = process.env;

const options = {
  useNewUrlParser: true,
  user: DB_USER,
  pass: DB_PASSWORD,
};

mongoose.connect(DB_URL, options);
mongoose.Promise = global.Promise;


const app = express();

app.set('secretKey', SECRET_KEY);
app.disable('etag');

// connection to mongodb
mongoose.connection.on('error', err => logger.error(`error: ${err}`));

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/api/users', users);
app.use('/api/tickets', tickets);
app.use('/api/categories', categories);

// private routes
app.use('/api/tickets', authentication, privateTickets);
app.use('/api/users', authentication, privateUsers);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  next();
});


// listen
app.listen(PORT, () => {
  logger.info('Server started');
});

process
  .on('unhandledRejection', reason => logger.error(reason))
  .on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
  })
  .on('SIGINT', () => {
    logger.info('Server stopped');
    process.exit(0);
  });

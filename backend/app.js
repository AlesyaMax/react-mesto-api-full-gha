require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/NotFoundError');
const { PORT, DB_URL } = require('./config');
const { cardRouter, userRouter } = require('./routes/index');
const { handleErrors } = require('./middlewares/errors');
const { validateSignin, validateSignup } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3001',
      'http://mesto.am.nomoredomainsmonster.ru',
      'https://mesto.am.nomoredomainsmonster.ru',
    ],
    credentials: true,
  }),
);

// app.use((req, res, next) => {
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   res.header('Access-Control-Allow-Origin', '*');

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     res.end();
//   }

//   next();
// });

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);

app.use(auth);

app.use(cardRouter);
app.use(userRouter);

app.use('/', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT);

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
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

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(requestLogger);

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

const jwt = require('jsonwebtoken');
const AuthError = require('../utils/AuthError');
const { SECRET_KEY } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let payload;
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new AuthError('Неправильные почта или пароль');
    }
    const validToken = token.replace('jwt=', '');
    // const { authorization } = req.headers;
    // if (!authorization.startsWith('Bearer ')) {
    //   throw new AuthError('что-то с заголовком');
    // }
    // const validToken = authorization.replace('Bearer ', '');
    payload = jwt.verify(
      validToken,
      NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
    );
  } catch (error) {
    next(new AuthError('Необходимо авторизоваться'));
  }
  req.user = payload;

  next();
};

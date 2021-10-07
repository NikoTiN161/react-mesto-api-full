import jsonwebtoken from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
function auth(req, res, next) {
  const { jwt } = req.cookies;
  if (!jwt) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
}

export default auth;

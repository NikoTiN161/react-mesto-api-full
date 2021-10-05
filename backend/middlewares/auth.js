import jsonwebtoken from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

const { JWT_SECRET = 'dev-key' } = process.env;

// eslint-disable-next-line consistent-return
function auth(req, res, next) {
  const { jwt } = req.cookies;
  if (!jwt) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
}

export default auth;

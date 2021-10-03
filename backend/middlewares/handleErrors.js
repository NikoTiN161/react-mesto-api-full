export default function handleErrors(err, req, res, next) {
  let { statusCode = 500, message } = err;
  if (err.name === 'MongoServerError' && err.code === 11000) {
    message = 'Такой email уже существует';
    statusCode = 409;
  }
  if (err.name === 'ValidationError') {
    message = err.message;
    statusCode = 400;
  }
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
}

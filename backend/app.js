import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { celebrate, errors, Joi } from 'celebrate';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { login, createUser } from './controllers/users';
import auth from './middlewares/auth';
import handleErrors from './middlewares/handleErrors';
import customValidationUrl from './utils/utils';
import cors from './middlewares/cors';
import { requestLogger, errorLogger } from './middlewares/logger'; 

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(customValidationUrl),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

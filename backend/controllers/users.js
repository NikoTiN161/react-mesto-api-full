import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';

const { NODE_ENV, JWT_SECRET } = process.env;

export const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        });
      res.send({ email: user.email, _id: user._id, message: 'Успешный вход' });
    })
    .catch(next);
};

export const logout = (req, res) => {
  res
    .cookie('jwt', '', {
      maxAge: -1,
    });
  res.send({ message: 'Успешный выход' });
};

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) throw new BadRequestError('Произошла ошибка');
      res.send(users);
    })
    .catch(next);
};

export const getUserId = (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

export const getUserMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

export const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, password: hash, name, about, avatar,
      })
        .then((user) => {
          res.send({
            data: {
              email: user.email,
              name: user.name,
              about: user.about,
              avatar: user.avatar,
            },
          });
        })
        .catch((err) => {
          if (err.name === 'MongoServerError' && err.code === 11000) {
            next(new ConflictError('Такой email уже существует'));
          }
        });
    });
};

export const updateUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

export const updateUserAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

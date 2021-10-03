import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers,
  getUserId,
  getUserMe,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/users';
import customValidationUrl from '../utils/utils';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserMe);
usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), getUserId);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(customValidationUrl),
  }),
}), updateUserAvatar);

export default usersRouter;

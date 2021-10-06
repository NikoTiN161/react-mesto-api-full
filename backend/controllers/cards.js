import Card from '../models/card';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import ForbiddenError from '../errors/ForbiddenError';

export const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Карточки не найдены');
      }
      res.send(cards);
    })
    .catch(next);
};

export const createCards = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      Card.findOne({ name: name, link: link })
        .populate('owner')
        .then((card) => {
          res.send(card);
        })
        .catch(next);
    })
    .catch(next);
};

export const deleteCards = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (req.user._id === card.owner._id.toString()) {
        Card.findByIdAndRemove({ _id: req.params.cardId })
          .then((data) => {
            if (!data) {
              throw new ReferenceError();
            }
            res.send({ message: 'Карточка удалена' });
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Вы не владелец карточки');
      }
    })
    .catch(next);
};

export const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

export const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send(card);
      } else throw new ReferenceError();
    })
    .catch(next);
};

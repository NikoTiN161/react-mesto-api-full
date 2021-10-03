import mongoose from 'mongoose';
import validator from 'validator';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array(mongoose.Schema.Types.ObjectId),
    default: [],

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{ versionKey: false });

export default mongoose.model('card', cardSchema);

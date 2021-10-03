import validator from 'validator';
import BadRequestError from '../errors/BadRequestError';

const customValidationUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new BadRequestError('URL validation error');
  }
  return value;
};

export default customValidationUrl;

import Joi from 'joi';

export const GeolocationSchema = Joi.object({
  id: Joi.number().required(),
  street: Joi.string().required(),
  number: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  latitude: Joi.string().allow(null),
  longitude: Joi.string().allow(null),
});

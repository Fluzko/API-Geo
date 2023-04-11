import Joi from 'joi';

export const GeolocateSchema = Joi.object({
  street: Joi.string().required(),
  number: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
});

import { celebrate, Joi } from 'celebrate'

export const initialRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    countryId: Joi.string(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }),
})

export const confirmEmailAndRegisterShop = celebrate({
  body: Joi.object().keys({
    token: Joi.string().required(),
    password: Joi.string().required(),
  }),
})

export const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
})

export const forgotPassword = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
})

export const resetPassword = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    resetToken: Joi.string().required(),
  }),
})

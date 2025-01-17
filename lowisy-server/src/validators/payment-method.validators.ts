import { celebrate, Joi } from 'celebrate'

//export const getPaymentMethods = celebrate({})
export const getPaymentMethod = celebrate({
  params: Joi.object().keys({
    paymentId: Joi.string().required(),
  }),
})
export const deletePaymentMethod = celebrate({
  params: Joi.object().keys({
    paymentId: Joi.string().required(),
  }),
})
export const updatePaymentMethod = celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
  }),
  params: Joi.object().keys({
    paymentId: Joi.string().required(),
  }),
})
export const createPaymentMethod = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
})

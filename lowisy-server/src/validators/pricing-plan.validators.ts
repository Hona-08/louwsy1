import { celebrate, Joi } from 'celebrate'

export const getPricePlan = celebrate({
  params: Joi.object().keys({
    pricePlanId: Joi.string().required(),
  }),
})
export const deletePricePlan = celebrate({
  params: Joi.object().keys({
    pricePlanId: Joi.string().required(),
  }),
})
export const updatePricePlan = celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    cost: Joi.string(),
    discountCost: Joi.string(),
    timePeriodInMonths: Joi.number(),
    pricePlanId: Joi.string(),
  }),

  params: Joi.object().keys({
    pricePlanId: Joi.string().required(),
  }),
})
export const createPricePlan = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    cost: Joi.string().required(),
    discountCost: Joi.string().required(),
    timePeriodInMonths: Joi.number().required(),
  }),
})

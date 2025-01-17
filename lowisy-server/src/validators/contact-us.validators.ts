import { celebrate, Joi } from 'celebrate'

export const getContactUs = celebrate({
  query: Joi.object().keys({
    pageNumber: Joi.number().default(1).min(0),
    pageSize: Joi.number().default(10),
    searchQuery: Joi.string().default('').allow(''),
    sortBy: Joi.string().default('').allow(''),
    order: Joi.string().default('asc').allow(''),
  }),
})

export const getContactUsById = celebrate({
  params: Joi.object().keys({
    contactUsId: Joi.string().required(),
  }),
})

export const createContactUs = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  }),
})

export const updateContactUs = celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    subject: Joi.string(),
    message: Joi.string(),
  }),
})

export const deleteContactUs = celebrate({
  params: Joi.object().keys({
    contactUsId: Joi.string().required(),
  }),
})

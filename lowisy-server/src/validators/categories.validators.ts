import { celebrate, Joi } from 'celebrate'

export const createCategories = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
})

export const getCategory = celebrate({
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
})

export const updateCategories = celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
  }),
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
})

export const deleteCategories = celebrate({
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
})

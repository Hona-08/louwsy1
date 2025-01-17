import { celebrate, Joi } from 'celebrate'

export const getProducts = celebrate({
  query: Joi.object().keys({
    pageNumber: Joi.number().default(1).min(0),
    pageSize: Joi.number().default(10),
    searchQuery: Joi.string().default('').allow(''),
    sortBy: Joi.string().default('').allow(''),
    order: Joi.string().default('asc').allow(''),
    filterStatus: Joi.string().default('All').allow('All', 'Archived'),
  }),
})

export const getProduct = celebrate({
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
})
export const deleteProduct = celebrate({
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
})
export const updateProduct = celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    shortDescription: Joi.string(),
    longDescription: Joi.string(),
    price: Joi.number(),
    images: Joi.array(),
    isFeatured: Joi.bool(),
    categoriesId: Joi.string().allow(null),
  }),
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
})

//todo
export const createProductMethod = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    shortDescription: Joi.string().required(),
    longDescription: Joi.string().required(),
    price: Joi.number().required(),
    isFeatured: Joi.bool().required(),
    images: Joi.string(),
    categoriesId: Joi.string(),
  }),
})

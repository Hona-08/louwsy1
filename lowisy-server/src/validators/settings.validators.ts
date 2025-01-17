import { celebrate, Joi } from 'celebrate'

// export const getShop = celebrate({

// })

export const updateShop = celebrate({
  body: Joi.object().keys({
    url: Joi.string(),
    name: Joi.string(),
    streetAddress: Joi.string(),
    houseNumber: Joi.string(),
    postalCode: Joi.string(),
    cityName: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    phone: Joi.string(),
    currency: Joi.string(),
    category: Joi.string(),
    coverImage: Joi.string(),
    logo: Joi.string(),
    categoryId: Joi.string(),
    facebookUrl: Joi.string(),
    instagramUrl: Joi.string(),
    taxRegistration: Joi.string(),
    expirationDate: Joi.string(),
    countryId: Joi.string(),
    lastLoginDate: Joi.string(),
  }),
  params: Joi.object().keys({
    shopId: Joi.string().required(),
  }),
})

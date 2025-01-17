import { time } from 'aws-sdk/clients/frauddetector'
import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'
import { DeliveryOptions } from './delivery-option.model'
import { PaymentMethod } from './payment-method.model'
import { ShopPaymentMethod } from './shop-payment-method.model'

export class Shop extends BaseModel {
  static get tableName() {
    return TABLES.SHOP
  }
  static get relationMappings(): any {
    return {
      paymentName: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: PaymentMethod,
        join: {
          from: `${TABLES.SHOP}.id`,
          to: `${TABLES.PAYMENT_METHOD}.id`,
          through: {
            from: `${TABLES.SHOP_PAYMENT_METHOD}.shopId`,
            to: `${TABLES.SHOP_PAYMENT_METHOD}.paymentMethodId`,
          },
        },
      },
      deliveryOptions: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: DeliveryOptions,
        join: {
          from: `${TABLES.SHOP}.id`,
          to: `${TABLES.DELIVERY_OPTIONS}.id`,
          through: {
            from: `${TABLES.SHOP_DELIVERY_OPTIONS}.shopId`,
            to: `${TABLES.SHOP_DELIVERY_OPTIONS}.deliveryOptionId`,
          },
        },
      },
    }
  }

  static jsonSchema = {
    type: 'object',
    // required: ['name'],
    properties: {
      id: { type: 'string' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      slug: { type: 'string', minLength: 1, maxLength: 255 },
      streetAddress: { type: 'string', minLength: 1, maxLength: 255 },
      houseNumber: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: 'string', minLength: 1, maxLength: 255 },
      // password: { type: 'string', minLength: 1, maxLength: 255 },
      // lastLoginDate: { type: 'string',},
      // updatedAt: { type: 'string', },
    },
  }

  url: string
  name: string
  slug: string
  streetAddress: string
  houseNumber: string
  postalCode: string
  cityName: string
  email: string
  password: string
  phone: string
  currency: string
  category: string
  coverImage: string
  logo: string
  categoryId: string
  facebookUrl: string
  instagramUrl: string
  taxRegistration: string
  expirationDate: string
  countryId: string
  lastLoginDate: string
  shippingCost: number
  minimumOrder: number
  openingTime: string
  closingTime: string
  shippingType: string
  isActive: boolean
  isTaxRegister: boolean
  onBoarding: boolean
  openDays: string[] | string | null
  rating?: object
}

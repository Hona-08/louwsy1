import { TABLES } from '../constants'
import { BaseModel } from './base.model'

export class Discount extends BaseModel {
  static get tableName() {
    return TABLES.DISCOUNT_CODE
  }

  code: string
  restaurantEmail: string
  customerEmail: string
  validTill: string
  discountPercentage: number
  limit: number
  used: number
  usedBy: 'restaurant' | 'customer'
  amount: number
}

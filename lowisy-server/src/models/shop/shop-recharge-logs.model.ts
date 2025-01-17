import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class ShopRechargeLogs extends BaseModel {
  static get tableName() {
    return TABLES.SHOP_RECHARGE_LOGS
  }

  shopId: string
  cost: number
  newTimePeriod: string
  prevTimePeriod: string
  timePeriodInMonths: number //underscore nalekhni
  paymentMethodId: string
  klarnaReferenceId: string
  discountId: string
  paypalOrderId: string
}

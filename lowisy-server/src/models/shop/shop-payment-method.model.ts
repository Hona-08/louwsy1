import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'
import { PaymentMethod } from './payment-method.model'

export class ShopPaymentMethod extends BaseModel {
  static get tableName() {
    return TABLES.SHOP_PAYMENT_METHOD
  }

  shopId: string
  paymentMethodId: string
}

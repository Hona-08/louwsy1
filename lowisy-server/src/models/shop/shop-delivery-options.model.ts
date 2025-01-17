import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class ShopDeliveryOptions extends BaseModel {
  static get tableName() {
    return TABLES.SHOP_DELIVERY_OPTIONS
  }
  shopId: string
  deliveryOptionId: string
}

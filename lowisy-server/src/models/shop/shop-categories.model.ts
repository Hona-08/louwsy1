import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class ShopCategories extends BaseModel {
  static get tableName() {
    return TABLES.SHOP_CATEGORIES
  }
  shopId: string
  categoryId: string
}

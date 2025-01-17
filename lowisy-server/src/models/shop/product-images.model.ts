import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class ProductImages extends BaseModel {
  static get tableName() {
    return TABLES.PRODUCT_IMAGES
  }

  // static get idColumn() {
  //   return 'id';
  // }

  productId: string
  name: string
}

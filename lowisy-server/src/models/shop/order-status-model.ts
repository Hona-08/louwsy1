import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class OrderStatus extends BaseModel {
  static get tableName() {
    return TABLES.ORDER_STATUS
  }
  name: string
  description: string
}

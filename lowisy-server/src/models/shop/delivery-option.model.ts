import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class DeliveryOptions extends BaseModel {
  static get tableName() {
    return TABLES.DELIVERY_OPTIONS
  }
  name: string
  description: string
}

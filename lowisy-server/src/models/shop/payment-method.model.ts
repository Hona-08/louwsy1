import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class PaymentMethod extends BaseModel {
  static get tableName() {
    return TABLES.PAYMENT_METHOD
  }
  name: string
}

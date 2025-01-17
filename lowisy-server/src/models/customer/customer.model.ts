import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'
import { Order } from '../shop'

export class Customer extends BaseModel {
  static get tableName() {
    return TABLES.CUSTOMER
  }

  static get relationMappings(): any {
    return {
      orders: {
        relation: BaseModel.HasManyRelation,
        modelClass: Order,
        join: {
          from: `${TABLES.CUSTOMER}.id`,
          to: `${TABLES.ORDER}.customerId`,
        },
      },
    }
  }

  name: string
  phone: string
  email: string
  password: string
  status: string
}

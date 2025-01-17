import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'
import { Customer } from '../customer'
import { OrderStatus } from './order-status-model'
import { ShippingAddress } from './shipping-address.model'

export class Order extends BaseModel {
  static get tableName() {
    return TABLES.ORDER
  }

  static get relationMappings(): any {
    return {
      customer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: `${TABLES.ORDER}.customerId`,
          to: `${TABLES.CUSTOMER}.id`,
        },
      },
      status: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: OrderStatus,
        join: {
          from: `${TABLES.ORDER}.orderStatusId`,
          to: `${TABLES.ORDER_STATUS}.id`,
        },
      },
      shippingAddress: {
        relation: BaseModel.HasOneRelation,
        modelClass: ShippingAddress,
        join: {
          from: `${TABLES.ORDER}.id`,
          to: `${TABLES.SHIPPING_ADDRESS}.orderId`,
        },
      },
    }
  }
  totalCost: number
  paymentMethodId: string
  customerId: string
  shopId: string
  orderStatusId: string
  inputDetails: string
  orderNo: string
  customer?: Customer
  status?: OrderStatus
  discountId: string
  klarnaReferenceId: string
  paypalOrderId: string
  pickupTime: string
}

import { double } from 'aws-sdk/clients/lightsail'
import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class ShippingAddress extends BaseModel {
  static get tableName() {
    return TABLES.SHIPPING_ADDRESS
  }
  fullName: string
  zipCode: string
  address1: string
  address2: string
  email: string
  phone: string
  customerId?: string
  orderId?: string
}

import { double } from 'aws-sdk/clients/lightsail'
import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class Rating extends BaseModel {
  static get tableName() {
    return TABLES.RATING
  }
  rate: string
  customerId: string
  shopId: string
  totalCount?: string
}

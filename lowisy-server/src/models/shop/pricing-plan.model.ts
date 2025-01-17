import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class PricingPlans extends BaseModel {
  static get tableName() {
    return TABLES.PRICING_PLANS
  }
  name: string
  cost: number
  discountCost: number
  timePeriodInMonths: number
}

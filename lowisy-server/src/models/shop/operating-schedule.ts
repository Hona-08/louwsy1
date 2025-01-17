import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class OperatingSchedule extends BaseModel {
  static get tableName() {
    return TABLES.OPERATING_SCHEDULES
  }
  daysOfWeek: string
  shopId: string
  startTime: string
  closeTime: string
  phaseIndex: number
}

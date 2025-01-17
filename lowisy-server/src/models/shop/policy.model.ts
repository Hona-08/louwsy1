import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class Policies extends BaseModel {
  static get tableName() {
    return TABLES.POLICY
  }
  termsOfUse: string
  privacyPolicy: string
  isPredefined: boolean
  shopId: string
}

import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class Country extends BaseModel {
  static get tableName() {
    return TABLES.COUNTRY
  }
  countryName: string
  currency: string
}

import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class ContactUs extends BaseModel {
  static get tableName() {
    return TABLES.CONTACT_US
  }
  name: string
  email: string
  subject: string
  message: string
}

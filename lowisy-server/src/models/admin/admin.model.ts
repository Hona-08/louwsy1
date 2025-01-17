import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class Admin extends BaseModel {
  static get tableName() {
    return TABLES.ADMIN
  }

  static jsonSchema = {
    type: 'object',
    // required: ['name'],
    properties: {
      id: { type: 'string' },
      email: { type: 'string', minLength: 1, maxLength: 255 },
      // password: { type: 'string', minLength: 1, maxLength: 255 },
      // lastLoginDate: { type: 'string',},
      // updatedAt: { type: 'string', },
      createdAt: { type: 'string' },
    },
  }

  email: string
  password: string
  lastLoginDate: string
}

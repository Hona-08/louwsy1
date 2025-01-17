import { Model, QueryContext } from 'objection'
import { v4 } from 'uuid'
import { getCurrentDate } from '../utils'

export class BaseModel extends Model {
  // we added this because insertAndFetch was returning zero
  // and mysql 5.7 was not supporting UUID() function call
  // as a default value
  async $beforeInsert(queryContext: QueryContext) {
    this.id = v4()
    this.createdAt = getCurrentDate()
  }

  $beforeUpdate(test: any) {
    console.log(test)
    this.updatedAt = getCurrentDate()
    this.createdAt = getCurrentDate(this.createdAt)
  }

  id: any // change it later to number
  updatedAt: string
  createdAt: string
}

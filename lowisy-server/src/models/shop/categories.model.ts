import { Model } from 'objection'
import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'

export class Categories extends BaseModel {
  static get tableName() {
    return TABLES.CATEGORIES
  }

  static get relationMappings() {
    return {
      subCategories: {
        relation: Model.HasManyRelation,
        modelClass: Categories,
        join: {
          from: 'categories.id',
          to: 'categories.parentId',
        },
      },
    }
  }

  name: string
  description: string
  parentId: string
  shopId: string
  isArchive?: boolean
}

import { Prompt } from 'twilio/lib/twiml/VoiceResponse'
import { TABLES } from '../../constants'
import { BaseModel } from '../base.model'
import { ProductImages } from './product-images.model'
import { bool } from 'aws-sdk/clients/signer'

export class Product extends BaseModel {
  static get tableName() {
    return TABLES.PRODUCT
  }

  // static get idColumn() {
  //   return 'id';
  // }
  static get relationMappings(): any {
    return {
      productImages: {
        relation: BaseModel.HasManyRelation,
        modelClass: ProductImages,
        join: {
          from: `${TABLES.PRODUCT}.id`,
          to: `${TABLES.PRODUCT_IMAGES}.productId`,
        },
      },
    }
  }
  name: string
  shortDescription: string
  longDescription: string
  price: string
  tax: string
  unit: string
  packagingContent: string
  shopId: string
  isFeatured: boolean
  categoriesId: string | null
  isArchive: boolean
}

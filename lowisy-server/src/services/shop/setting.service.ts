import { Shop } from '../../models'
import Slug from 'slug'
import { BadRequestError } from '../../errors'
import bcrypt from 'bcryptjs'
import { addDays } from '../../utils'
import { validateVatNumber } from '../../utils/common/vatValidation'

export async function getShop(id: string) {
  const baseline = await Shop.query().findById(id)
  return baseline
}

type UpdateSettings = {
  shop: Partial<Shop>
  shopId: string
  files: any
}
export async function updateShop({ shop, shopId, files = {} }: UpdateSettings) {
  if (files.coverImage) {
    const { coverImage } = files
    shop.coverImage = coverImage[0]?.key
  }
  if (files.logo) {
    const { coverImage, logo } = files
    shop.logo = logo[0]?.key
  }

  const shopExist = await Shop.query().where({ id: shopId }).first()
  if (shopExist) {
    if (shop?.password) {
      shop.password = bcrypt.hashSync(shop.password, 10)
    }

    console.log({ tax: shop?.taxRegistration, shop: shop })

    const isValid = await validateVatNumber(
      shop?.taxRegistration ?? shopExist?.taxRegistration,
    )

    if (isValid) {
      shop.isTaxRegister = true
    } else {
      shop.isTaxRegister = false
    }

    if (!isValid) {
      throw new BadRequestError('INVALID_VAT_NUMBER')
    }

    await Shop.query().patch(shop).where({
      id: shopId,
    })
  } else {
    let slug = Slug(shop.name)
    const slugExist = await Shop.query().where({ slug }).first()

    if (slugExist) {
      const checkNumber = slugExist.slug.split('-').at(-1)
      const index = isNaN(+checkNumber) ? 1 : checkNumber + 1

      slug = Slug(`${slug}-${index}`)
    }
    shop.slug = slug
    shop.expirationDate = addDays(10)
    console.log({ taxRegsi: shop.taxRegistration })
    const isValid = await validateVatNumber(shop?.taxRegistration)

    console.log({ shopValidity: isValid })
    if (isValid) {
      shop.isTaxRegister = true
    }

    const nameExist = await Shop.query().where({ name: shop.name }).first()

    if (nameExist) {
      throw new BadRequestError('SHOP_NAME_ALREADY_EXIST')
    }

    await Shop.query().insertGraph(shop)
  }
}

import { OrderByDirection } from 'objection'
import { templateYourRating } from '../../constants/email-templates'
import { TABLES } from '../../constants/tables'
import { Categories, Order, Rating, Shop } from '../../models'
import { Customer } from '../../models/customer'
import { generateTree } from '../../utils/common/format'

export async function create({ rate, shopId, customerId }: Partial<Rating>) {
  //get shop id via slug
  const { id } = await Shop.query().where({ slug: shopId }).first()

  if (!id) return

  //check if the customer had previous order
  const prevOrder = await Order.query().where({ customerId, shopId: id })
  if (!prevOrder) return

  //rating
  await Rating.query().insert({
    rate,
    shopId: id,
    customerId,
  })
}

export async function getRatings() {
  const ratings = await Rating.query()
  return ratings
}

export async function getRatingsoFSingleCustomer(customerId: string) {
  const ratings = await Rating.query().where({ customerId })
  return ratings
}

export async function getAverageRatingOfAShop(shopId: string) {
  const ratings = await Rating.query()
    .avg('rate as rate')
    .count('id as totalCount')
    .where({ shopId })
    .first()
  return ratings
}

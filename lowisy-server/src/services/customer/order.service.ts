import { TABLES } from '../../constants'
import { Order } from '../../models'

export async function getCustomerOrders(
  customerId: string,
  { pageNumber, pageSize }: any,
) {
  const order = await Order.query()
    .withGraphJoined('status')
    .modifyGraph('status', (builder) => {
      builder.select(['name'])
    })
    .where({ customerId })
    .orderBy('createdAt', 'desc')
    .page(pageNumber, pageSize)
  return order
}

export async function getOrderIds() {
  const ids = await (await Order.query()).map((order) => order.id)
  return ids
}

export async function getOrder(id: string) {
  const order = await Order.query()
    .withGraphJoined('shippingAddress')
    .where(`${TABLES.ORDER}.id`, id)
    .first()
  return order
}

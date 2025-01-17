import { OrderByDirection } from 'objection'
import { TABLES } from '../../constants/tables'
import { Order, Product, ProductImages } from '../../models'
import { Customer } from '../../models/customer'

export type GetCustomers = {
  pageNumber: number
  pageSize: number
  searchQuery: string
  sortBy: string
  order: string
  shopId: string
}

export type GetCustomerOrders = {
  pageNumber: number
  pageSize: number
  searchQuery: string
  sortBy: string
  order: string
  customerId: string
}

export async function getCustomers({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
  order,
  shopId,
}: GetCustomers) {
  const customerIds = (
    await Order.query().select('customerId').where({ shopId })
  ).map((el) => el.customerId)

  const query = Customer.query()
    .where((builder) => {
      if (searchQuery?.length > 0) {
        builder
          .where('name', 'like', `%${searchQuery}%`)
          .orWhere('email', 'like', `%${searchQuery}%`)
          .orWhere('phone', 'like', `%${searchQuery}%`)
      }
    })
    .whereIn('id', customerIds)
    .page(pageNumber, pageSize)

  if (sortBy?.length > 0) {
    query.orderBy(sortBy, order as OrderByDirection)
  }

  const customers = await query
  return customers
}

export async function getCustomerOrders({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
  order,
  customerId,
}: GetCustomerOrders) {
  const query = Customer.query()
    .withGraphJoined('orders')
    .withGraphFetched('orders.customer')
    .modifyGraph('orders.customer', (builder) => {
      builder.select(['name'])
    })
    .withGraphJoined('orders.status')
    .modifyGraph('orders.status', (builder) => {
      builder.select(['name'])
    })
    .where((builder) => {
      if (searchQuery?.length > 0) {
        builder.where('orders.orderNo', 'like', `%${searchQuery}%`)
        //.orWhere('orders.status', 'like', `%${searchQuery}%`)
      }
    })
    .where(`${TABLES.CUSTOMER}.id`, customerId)
    .first()
  //.page(pageNumber, pageSize)

  if (sortBy?.length > 0) {
    query.orderBy(sortBy, order as OrderByDirection)
  }

  const customerOrders = await query
  return customerOrders
}

export async function getCustomer(id: string) {
  const customer = await Customer.query()
    // .withGraphJoined('productImages')
    // .modifyGraph('productImages', (builder) => {
    //   builder.select(['name as images'])
    // })
    .where(`${TABLES.CUSTOMER}.id`, id)
    .first()
  return customer
}

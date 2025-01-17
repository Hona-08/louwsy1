import { OrderByDirection } from 'objection'
const { raw } = require('objection')
// import uniqid from 'uniqid'
import { json } from 'stream/consumers'
import { TABLES } from '../../constants/tables'
import { OrderStatusType } from '../../enums/order-status'
import {
  DeliveryOptions,
  Order,
  OrderStatus,
  Product,
  ProductImages,
} from '../../models'

export async function getTotalOrders() {
  const totalOrders = await Order.query().count('* as ordersCount')

  return totalOrders
}
export async function getPendingOrders() {
  const pendingOrders = await Order.query()
    .withGraphJoined('status')
    .where((builder) => builder.where('status.name', 'Queued'))
    .count('* as pendingCounts')

  return pendingOrders
}
export async function getTodayOrders() {
  // const todayOrders = await Order.query().where('createdAt', '>=', new Date())
  // console.log('order date')
  // console.log('new date', new Date())
  // return todayOrders
}

import { OrderByDirection } from 'objection'
import uniqid from 'uniqid'
import { json } from 'stream/consumers'
import { TABLES } from '../../constants/tables'
import { OrderStatusType } from '../../enums/order-status'
import {
  DeliveryOptions,
  Order,
  OrderStatus,
  Product,
  ProductImages,
  Shop,
} from '../../models'
import { randomString } from '../../utils/common/random-string'
import { sendEmail } from '../../utils'
import { Customer } from '../../models/customer'
import { templateYourRating } from '../../constants/email-templates'
import { ShippingAddress } from '../../models/shop/shipping-address.model'
import axios from 'axios'
import { Discount } from '../../models/discount.model'
import {
  getDeTemplateOrder,
  getDeTemplateOrderCancelled,
  getEngTemplateOrder,
  getEngTemplateOrderCancelled,
} from '../../utils/getTemplateOrder'
import { time } from 'aws-sdk/clients/frauddetector'
import { BadRequestError } from '../../errors'
import { ReqLang } from '../../enums/lang'

let timer: any

export async function saveShippingAddress(address: ShippingAddress) {
  await ShippingAddress.query().insertGraph(address)
}

type CreateOrder = {
  paymentMethod: string
  totalCost: number
  cartList: any[]
  customerId: string
  klarnaReferenceId?: string
  paypalOrderId?: string
  discountId?: string
  address: any
  lang: 'en' | 'de'
}

export async function createOrder({
  totalCost,
  paymentMethod,
  cartList,
  customerId,
  klarnaReferenceId,
  paypalOrderId,
  discountId,
  address,
  lang,
}: CreateOrder) {
  if (klarnaReferenceId) {
    const orderExist = await Order.query().where({ klarnaReferenceId }).first()
    if (orderExist) {
      return
    }
  }

  if (paypalOrderId) {
    const orderExist = await Order.query().where({ paypalOrderId }).first()
    if (orderExist) {
      return
    }
  }

  const discountAmount = 0
  if (discountId?.length > 1) {
    const discount = await Discount.query().patchAndFetchById(discountId, {
      used: 1,
    })
    //discountAmount = discount.amount
  }

  const { id: orderStatusId } = await OrderStatus.query()
    .where({ name: OrderStatusType.PLACED })
    .first()

  const orderNo = randomString()

  // const shopId = cartList[0].restaurantId
  const shopId = '1d9b0889-f166-4054-a912-9e7c5f49f770'
  const { id: orderId } = await Order.query().insertAndFetch({
    totalCost: totalCost - discountAmount,
    inputDetails: JSON.stringify(cartList),
    shopId,
    orderNo,
    customerId,
    orderStatusId,
    discountId: discountId?.length > 1 ? null : null,
    klarnaReferenceId,
    paypalOrderId,
    pickupTime: address?.pickupTime,
  })

  // add orderId in the incoming address details
  const {
    addressType,
    isDefault,
    fullAddress: address1,
    createdAt,
    updatedAt,
    ...shippingAddress
  } = address
  shippingAddress.orderId = orderId
  shippingAddress.customerId = customerId
  shippingAddress.address1 = address1
  //save shipping address
  console.log({ shippingAddress })
  await ShippingAddress.query().insertAndFetch(shippingAddress)

  const shop = await Shop.query().findById(shopId)

  console.log({
    email: shop.email,
    restaurantName: shop.name,
    userName: address?.full_name,
    orderNumber: orderNo,
    restaurantEmail: shop.email,
    restaurantPhone: shop.phone,
    paypalOrderId,
    cartList,
    total: totalCost,
  })

  console.log({ lang })

  if (lang === 'de') {
    await sendEmail({
      emails: [shop.email],
      subject: 'Bestellung aufgegeben',
      html: getDeTemplateOrder({
        restaurantName: shop.name,
        userName: address?.full_name,
        orderNumber: orderNo,
        restaurantEmail: shop.email,
        orderId,
        restaurantPhone: shop.phone,
        cartList,
        total: totalCost,
        paymentMethod,
        // pickupTime,
      }),
    })
  } else {
    await sendEmail({
      emails: [shop.email],
      subject: 'Order Placed',
      html: getEngTemplateOrder({
        restaurantName: shop.name,
        userName: address?.full_name,
        orderNumber: orderNo,
        orderId,
        restaurantEmail: shop.email,
        restaurantPhone: shop.phone,
        cartList,
        total: totalCost,
        paymentMethod,
        // pickupTime,
      }),
    })
  }

  // Set a timer to cancel the order if not approved within 15 minutes
  timer = setTimeout(async () => {
    // Cancel the order

    const order = await Order.query().where({ id: orderId }).first()
    console.log({ order })
    if (order.orderStatusId === orderStatusId) {
      // admin didnot approve the order within 15 min
      // so order will be cancelled

      //get the id of cancelled status
      const { id: orderCancelledStatusId } = await OrderStatus.query()
        .where({ name: OrderStatusType.CANCELLED })
        .first()

      //update the status to cancelled
      await Order.query()
        .patch({ orderStatusId: orderCancelledStatusId })
        .where({ id: orderId })

      //send email to user to inform the order get cancelled
      if (lang === 'de') {
        await sendEmail({
          emails: [shop.email],
          subject: 'Bestellung storniert',
          html: getDeTemplateOrderCancelled({
            restaurantName: shop.name,
            userName: address?.full_name,
            orderNumber: orderNo,
            restaurantEmail: shop.email,
            restaurantPhone: shop.phone,
            cartList,
            total: totalCost,
            paymentMethod,
            // pickupTime,
          }),
        })
      } else {
        await sendEmail({
          emails: [shop.email],
          subject: 'Order Cancelled',
          html: getEngTemplateOrderCancelled({
            restaurantName: shop.name,
            userName: address?.full_name,
            orderNumber: orderNo,
            restaurantEmail: shop.email,
            restaurantPhone: shop.phone,
            cartList,
            total: totalCost,
            paymentMethod,
            // pickupTime,
          }),
        })
      }
    }
  }, 15 * 60 * 1000) // 15 minutes
}

export type GetOrders = {
  pageNumber: number
  pageSize: number
  searchQuery: string
  sortBy: string
  order: string
  filterStatus: string
}

export async function getOrders(
  { pageNumber, pageSize, searchQuery, sortBy, order, filterStatus }: GetOrders,
  shopId: string,
) {
  const query = Order.query()
    .withGraphFetched('customer')
    .modifyGraph('customer', (builder) => {
      builder.select(['name'])
    })
    .withGraphJoined('status')
    .modifyGraph('status', (builder) => {
      builder.select(['name'])
    })
    .where((builder) => {
      if (searchQuery?.length > 0) {
        builder
          .where('status.name', 'like', `%${searchQuery}%`)
          .orWhere('customer.name', 'like', `%${searchQuery}%`)
          .orWhere('totalCost', 'like', `%${searchQuery}%`)
          .orWhere('orderNo', 'like', `%${searchQuery}%`)
      }
      if (filterStatus && filterStatus !== 'All') {
        builder.where('status.name', filterStatus)
      }
    })
    .where({ shopId })
    .page(pageNumber, pageSize)

  if (sortBy?.length > 0) {
    query.orderBy(sortBy, order as OrderByDirection)
  }

  const orders = await query
  return orders
}

export async function getOrder(id: string) {
  const order = await Order.query()
    .withGraphJoined('shippingAddress')
    // .modifyGraph('shippingAddress', (builder) => {
    //   builder.select(['name as images'])
    // })
    .where(`${TABLES.ORDER}.id`, id)
    .first()
  return order
}

export async function findMyOrder({
  orderNo,
  email,
}: {
  orderNo: string
  email: string
}) {
  const order = await Order.query().where({ orderNo }).first()

  if (!order) {
    throw new BadRequestError('NOT_FOUND')
  }

  const shippingAddress = await ShippingAddress.query()
    .where({ orderId: order.id, email })
    .first()

  if (!shippingAddress) throw new BadRequestError('NOT_FOUND')

  const { name } = await OrderStatus.query()
    .where({ id: order.orderStatusId })
    .first()
  return {
    orderNo,
    pickupTime: order.pickupTime,
    status: name,
    email,
  }
}

type UpdateOrder = {
  status: string
  orderId: string
  lang: 'en' | 'de'
}
export async function updateOrder({ status, orderId, lang }: UpdateOrder) {
  const orderExist = await Order.query().where({ id: orderId }).first()

  if (!orderExist) {
    return
  }

  await Order.query().patch({ orderStatusId: status }).where({
    id: orderId,
  })

  // Cancel the timer that was set when the order was created
  clearTimeout(timer)

  const { name } = await OrderStatus.query().where({ id: status }).first()

  if (name === OrderStatusType.DELIVERED && orderExist.klarnaReferenceId) {
    const token = `PK75711_7a21c28e2f75:0Gq7Ej7LxYedMBEd`
    const encodedToken = Buffer.from(token).toString('base64')
    const { data } = await axios.post(
      `https://api.playground.klarna.com/ordermanagement/v1/orders/${orderExist.klarnaReferenceId}/captures`,
      {
        captured_amount: orderExist.totalCost * 100,
      },
      {
        headers: { Authorization: 'Basic ' + encodedToken },
      },
    )
  }

  // get email
  const { email, fullName } = await ShippingAddress.query()
    .where({ orderId })
    .first()

  //get shop name
  const { name: restaurantName, slug } = await Shop.query()
    .where({ id: orderExist.shopId })
    .first()

  if (name === OrderStatusType.DELIVERED) {
    await sendEmail({
      emails: [email],
      subject: `Rate your order ${orderExist.orderNo} from ${restaurantName}`,
      html: templateYourRating[lang]
        .replace('$orderNumber$', orderExist.orderNo)
        .replace('$restaurantName$', restaurantName)
        .replace('$userName$', fullName)
        .replace('$restaurantId$', slug),
    })
  }
}

export async function deleteOrder(id: string) {
  //delete order
  await Order.query().deleteById(id)
}

export async function getOrderStatus() {
  const orderStatus = await OrderStatus.query()
  return orderStatus
}

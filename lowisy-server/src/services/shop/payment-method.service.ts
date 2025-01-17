import { TABLES } from '../../constants'
import { Shop } from '../../models'
import { PaymentMethod } from '../../models/shop/payment-method.model'
import { ShopPaymentMethod } from '../../models/shop/shop-payment-method.model'

export async function getPaymentMethodsOfShop(shopId: string) {
  const payments = await Shop.query()
    .withGraphFetched('paymentName')
    // .modifyGraph('paymentName', (builder) => {
    //   builder.select(['name'])
    // })
    .where(`${TABLES.SHOP}.id`, shopId)
    .first()
  return payments
}

export async function getPaymentMethods() {
  const paymentMethods = await PaymentMethod.query()

  return paymentMethods
}

type UpdatePaymentMethods = {
  paymentMethodIds: string[]
  shopId: string
}
export async function updatePaymentMethod({
  paymentMethodIds,
  shopId,
}: UpdatePaymentMethods) {
  //delete all payment method of given shop
  await ShopPaymentMethod.query().delete().where({ shopId })

  //insert
  const paymentMethods = paymentMethodIds.map((paymentMethodId) => {
    return { paymentMethodId, shopId }
  })

  await ShopPaymentMethod.query().insertGraph(paymentMethods)
}

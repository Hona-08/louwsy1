import { time } from 'aws-sdk/clients/frauddetector'
import { TABLES } from '../../constants'
import { Shop } from '../../models'
import { OperatingSchedule } from '../../models/shop/operating-schedule'

export async function getDeliveryOption(shopId: string) {
  const delivery = await Shop.query()
    .withGraphFetched('deliveryOptions')
    .where(`${TABLES.SHOP}.id`, shopId)
    .first()
  return delivery
}
type UpdateDeliveryOption = {
  shopId: string
  shippingCost: number
  minimumOrder: number
  openingTime: time
  closingTime: time
  shippingType: string
  operatingSchedule?: any
  openDays?: string[]
}
export async function updateDeliveryOption({
  minimumOrder,
  shippingCost,
  openingTime,
  closingTime,
  shopId,
  shippingType,
  operatingSchedule = [],
  openDays = [],
}: UpdateDeliveryOption) {
  if (operatingSchedule?.length > 0) {
    await OperatingSchedule.query().delete().where({ shopId })
  }
  const shopOperatingSchedule = operatingSchedule.map((schedule: any) => {
    return { shopId, ...schedule }
  })

  console.log({ shopOperatingSchedule })

  // shopOperatingSchedule.length > 0 &&
  //   shopOperatingSchedule.map(async (data: OperatingSchedule) => {
  //     console.log(data)
  //     await OperatingSchedule.query().insert(data)
  //   })

  await Shop.query()
    .findById(shopId)
    .patch({
      minimumOrder,
      shippingCost,
      openingTime,
      closingTime,
      shippingType,
      openDays: JSON.stringify(openDays),
    })
}

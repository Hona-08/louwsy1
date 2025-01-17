import { DeliveryOptions } from '../../models'

export async function getDeliveries() {
  const deliveries = await DeliveryOptions.query()
  return deliveries
}

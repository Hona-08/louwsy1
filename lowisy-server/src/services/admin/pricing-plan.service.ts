import { PricingPlans } from '../../models/shop'

export async function getPricePlans() {
  const pricePlans = await PricingPlans.query()
  return pricePlans
}

export async function getPricePlan(id: string) {
  const pricePlan = await PricingPlans.query().findById(id)
  return pricePlan
}

export async function deletePricePlan(id: string) {
  await PricingPlans.query().deleteById(id)
}

type UpdatePriceModel = {
  pricePlan: Partial<PricingPlans>
  pricePlanId: string
}

export async function updatePricePlan({
  pricePlan,
  pricePlanId,
}: UpdatePriceModel) {
  await PricingPlans.query().patch(pricePlan).where({
    id: pricePlanId,
  })
}

export async function createPricePlan(pricePlan: PricingPlans) {
  await PricingPlans.query().insert(pricePlan)
}

import { TABLES } from '../../constants'
import { Shop } from '../../models'
import { Policies } from '../../models/shop/policy.model'
import { ShopPaymentMethod } from '../../models/shop/shop-payment-method.model'

export async function getPolicies(shopId: string) {
  const policies = await Policies.query().where({ shopId }).first()
  return policies
}

type UpdatePolicy = {
  policyData: Partial<Policies>
  shopId: string
}
export async function updatePolicy({ policyData, shopId }: UpdatePolicy) {
  const policy = await Policies.query().where({ shopId }).first()

  if (policy) {
    await Policies.query().patch(policyData).where({
      shopId,
    })
  } else {
    policyData.shopId = shopId
    await Policies.query().insertGraph(policyData)
  }
}

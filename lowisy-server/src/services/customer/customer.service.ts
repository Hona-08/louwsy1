import { Customer } from '../../models/customer'
import { ShippingAddress } from '../../models/shop/shipping-address.model'

export async function getCustomer(id: string) {
  const customer = await Customer.query().where({ id }).first()
  return customer
}

export async function updateCustomer(id: string, customerData: Customer) {
  await Customer.query().patch(customerData).where({ id })
}

export async function customerAddresses(customerId: string) {
  if (customerId.length < 1) {
    return
  }
  const addresses = await ShippingAddress.query().where({ customerId })

  return addresses
}

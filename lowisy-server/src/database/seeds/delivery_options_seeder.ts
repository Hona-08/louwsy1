import { Knex } from 'knex'
import { TABLES } from '../../constants'

export async function seed(knex: Knex) {
  await knex(TABLES.DELIVERY_OPTIONS).del()

  // Inserts seed entries

  await knex(TABLES.DELIVERY_OPTIONS).insert([
    {
      name: 'Collect',
    },
    {
      name: 'Delivery',
    },
    {
      name: 'Shipping',
    },
  ])
}

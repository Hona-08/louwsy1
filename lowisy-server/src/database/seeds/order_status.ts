import { Knex } from 'knex'
import { TABLES } from '../../constants'

export async function seed(knex: Knex) {
  await knex(TABLES.ORDER_STATUS).del()

  // Inserts seed entries

  await knex(TABLES.ORDER_STATUS).insert([
    {
      name: 'Placed',
    },
    {
      name: 'Delivered',
    },
    {
      name: 'Queued',
    },
    {
      name: 'Cancelled',
    },
  ])
}

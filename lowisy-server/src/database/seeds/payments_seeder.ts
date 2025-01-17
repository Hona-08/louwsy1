import { Knex } from 'knex'
import { TABLES } from '../../constants'

export async function seed(knex: Knex) {
  await knex(TABLES.PAYMENT_METHOD).del()

  // Inserts seed entries

  await knex(TABLES.PAYMENT_METHOD).insert([
    {
      name: 'cash',
    },
    {
      name: 'klarna',
    },
  ])
}

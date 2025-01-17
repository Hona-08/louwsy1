import { Knex } from 'knex'
import { TABLES } from '../../constants'

export async function seed(knex: Knex) {
  await knex(TABLES.COUNTRY).del()

  // Inserts seed entries

  await knex(TABLES.COUNTRY).insert([
    {
      country_name: 'AUSTRIA',
      iso3: 'AUT',
      currency: 'EURO',
    },
  ])
}

import { Knex } from 'knex'
import { TABLES } from '../../constants'

export async function seed(knex: Knex) {
  await knex(TABLES.PRICING_PLANS).del()

  await knex(TABLES.PRICING_PLANS).insert([
    {
      cost: 18.0,
      timePeriodInMonths: 1,
    },
    {
      cost: 16,
      timePeriodInMonths: 12,
    },
    {
      cost: 15,
      timePeriodInMonths: 24,
    },
  ])
}

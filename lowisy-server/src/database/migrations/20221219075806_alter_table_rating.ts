import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Alter shops table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.RATING,
    (table: Knex.CreateTableBuilder) => {
      table.uuid('shop_id').references(`${TABLES.SHOP}.id`)
    },
  )
}

/**
 * Alter ratings table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.RATING,
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn('shop_id')
    },
  )
}

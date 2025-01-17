import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Alter shops table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.SHOP,
    (table: Knex.CreateTableBuilder) => {
      table.string('postal_code', 100).alter()
      table.string('phone', 100).alter()
    },
  )
}

/**
 * Drop shop table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.SHOP,
    (table: Knex.CreateTableBuilder) => {
      table.string('postal_code', 100)
      table.string('phone', 100)
    },
  )
}

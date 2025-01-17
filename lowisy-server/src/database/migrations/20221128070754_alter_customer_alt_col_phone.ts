import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Alter shops table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.CUSTOMER,
    (table: Knex.CreateTableBuilder) => {
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
    TABLES.CUSTOMER,
    (table: Knex.CreateTableBuilder) => {
      table.string('phone', 100)
    },
  )
}

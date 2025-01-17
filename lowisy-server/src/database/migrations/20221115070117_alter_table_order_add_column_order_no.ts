import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Alter shops table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.ORDER,
    (table: Knex.CreateTableBuilder) => {
      table.string('order_no').unique()
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
    TABLES.ORDER,
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn('order_no')
    },
  )
}

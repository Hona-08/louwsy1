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
      table.string('password')
      table.uuid('country_id')
      table.dateTime('last_login_date')
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
      table.dropColumn('password')
      table.dropColumn('country_id')
      table.dropColumn('last_login_date')
    },
  )
}

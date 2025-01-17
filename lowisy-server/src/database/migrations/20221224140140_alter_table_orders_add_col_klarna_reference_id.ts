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
      table.uuid('klarna_reference_id').nullable()
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
    TABLES.ORDER,
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn('klarna_reference_id')
    },
  )
}

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
      table.double('rate').alter()
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
      table.double('rate').alter()
    },
  )
}

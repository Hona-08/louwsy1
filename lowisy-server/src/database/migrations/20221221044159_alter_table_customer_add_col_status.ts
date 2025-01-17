import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.CUSTOMER,
    (table: Knex.CreateTableBuilder) => {
      table.enum('status', ['EMAIL_VERIFIED'])
    },
  )
}

/**
 * Drop <table_name> table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.CUSTOMER,
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn('status')
    },
  )
}

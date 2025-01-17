import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.ORDER,
    (table: Knex.CreateTableBuilder) => {
      table.string('paypal_order_id').nullable()
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
    TABLES.ORDER,
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn('paypal_order_id')
    },
  )
}

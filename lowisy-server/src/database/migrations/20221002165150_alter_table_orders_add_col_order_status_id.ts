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
      table.uuid('order_status_id').references(`${TABLES.ORDER_STATUS}.id`)
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
      table.dropColumn('order_status_id')
    },
  )
}

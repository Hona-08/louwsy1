import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.SHOP_RECHARGE_LOGS,
    (table: Knex.CreateTableBuilder) => {
      table.uuid('discount_id')
      table.uuid('klarna_reference_id')
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
    TABLES.SHOP_RECHARGE_LOGS,
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn('klarna_reference_id')
      table.dropColumn('discount_id')
    },
  )
}

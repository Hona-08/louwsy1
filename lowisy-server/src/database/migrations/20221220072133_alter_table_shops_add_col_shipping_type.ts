import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.SHOP,
    (table: Knex.CreateTableBuilder) => {
      table.enum('shipping_type', ['DELIVERY', 'PICKUP'])
      table.time('openingTime').alter()
      table.time('closingTime').alter()
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
    TABLES.SHOP,
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn('shipping_type')
      table.string('openingTime')
      table.string('closingTime')
    },
  )
}

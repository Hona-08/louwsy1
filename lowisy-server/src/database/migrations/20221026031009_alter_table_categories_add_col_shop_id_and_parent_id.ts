import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.CATEGORIES,
    (table: Knex.CreateTableBuilder) => {
      table.uuid('shop_id').references(`${TABLES.SHOP}.id`)
      table.uuid('parent_id').references(`${TABLES.CATEGORIES}.id`)
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
    TABLES.CATEGORIES,
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn('shop_id')
      table.dropColumn('parent_id')
    },
  )
}

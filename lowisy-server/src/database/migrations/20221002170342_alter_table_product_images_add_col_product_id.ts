import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.PRODUCT_IMAGES,
    (table: Knex.CreateTableBuilder) => {
      table.uuid('product_id').references(`${TABLES.PRODUCT}.id`)
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
    TABLES.PRODUCT_IMAGES,
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn('product_id')
    },
  )
}

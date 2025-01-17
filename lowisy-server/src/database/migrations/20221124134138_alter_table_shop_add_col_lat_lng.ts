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
      table.double('lat')
      table.double('lng')
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
      table.dropColumn('lat')
      table.dropColumn('lng')
    },
  )
}

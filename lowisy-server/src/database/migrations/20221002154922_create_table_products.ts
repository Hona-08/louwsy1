import { Knex } from 'knex'
import { TABLES } from '../../constants'

/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(
    TABLES.PRODUCT,
    (table: Knex.CreateTableBuilder) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
      table.string('name').unique()
      table.string('short_description')
      table.string('long_description')
      table.double('price')
      table.string('tax', 50)
      table.string('unit', 30)
      table.string('packaging_content', 100)
      table
        .dateTime('created_at')
        .notNullable()
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      table
        .dateTime('updated_at')
        .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
    },
  )
}

/**
 * Drop <table_name> table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLES.PRODUCT)
}

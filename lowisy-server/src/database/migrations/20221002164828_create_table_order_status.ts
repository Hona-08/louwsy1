import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(
    TABLES.ORDER_STATUS,
    (table: Knex.CreateTableBuilder) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
      table.string('name', 50)
      table.string('description')
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
  return knex.schema.dropTable(TABLES.ORDER_STATUS)
}
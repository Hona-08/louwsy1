import { Knex } from 'knex'
import { TABLES } from '../../constants'
/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(
    TABLES.SHIPPING_ADDRESS,
    (table: Knex.CreateTableBuilder) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
      table.string('full_name', 100)
      table.string('email', 50)
      table.string('phone', 100)
      table.string('zip_code', 100)
      table.string('address1', 100)
      table.string('address2', 100)
      table.uuid('customer_id').references(`${TABLES.CUSTOMER}.id`)
      table.uuid('order_id').references(`${TABLES.ORDER}.id`)
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
  return knex.schema.dropTable(TABLES.SHIPPING_ADDRESS)
}

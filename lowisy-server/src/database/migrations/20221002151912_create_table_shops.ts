import { Knex } from 'knex'
import { TABLES } from '../../constants'

/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(
    TABLES.SHOP,
    (table: Knex.CreateTableBuilder) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
      table.string('url', 300)
      table.string('name', 50)
      table.string('street_address', 70)
      table.string('house_number', 50)
      table.string('postal_code', 15)
      table.string('city_name', 30)
      table.string('email', 50).unique()
      table.string('phone', 15)
      table.string('cover_image')
      table.string('logo', 50)
      table.string('facebook_url', 100)
      table.string('instagram_url', 100)
      table.string('tax_registration', 100)
      table.date('expiration_date').nullable()
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
  return knex.schema.dropTable(TABLES.SHOP)
}

import { Knex } from 'knex'
import { TABLES } from '../../constants'

/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(
    TABLES.SHOP_RECHARGE_LOGS,
    (table: Knex.CreateTableBuilder) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
      table.uuid('shop_id').references(`${TABLES.SHOP}.id`)
      table.double('cost')
      table.date('new_time_period').nullable()
      table.date('prev_time_period').nullable()
      table.integer('time_period_in_months', 2)
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
  return knex.schema.dropTable(TABLES.SHOP_RECHARGE_LOGS)
}

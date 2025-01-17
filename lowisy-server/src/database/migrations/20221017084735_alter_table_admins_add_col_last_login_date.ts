import { Knex } from 'knex'
import { TABLES } from '../../constants'

/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(
    TABLES.ADMIN,
    (table: Knex.CreateTableBuilder) => {
      table.date('last_login_date').nullable()
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
    TABLES.ADMIN,
    (table: Knex.CreateTableBuilder) => {
      table.dropColumn('last_login_date')
    },
  )
}

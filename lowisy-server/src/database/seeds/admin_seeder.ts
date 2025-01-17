import { Knex } from 'knex'
import { TABLES } from '../../constants'
import bcrypt from 'bcryptjs'

export async function seed(knex: Knex) {
  await knex(TABLES.ADMIN).del()

  // Inserts seed entries

  await knex(TABLES.ADMIN).insert({
    email: 'admin@lowisy.com',
    password: bcrypt.hashSync('lowisy1#', 10),
  })
}

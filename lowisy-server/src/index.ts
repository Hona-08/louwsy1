import * as dotenv from 'dotenv'
dotenv.config({
  path: '.env',
})
import knex from 'knex'
import { Model } from 'objection'
import { server } from './app'
import { dbConfig } from './config/db'

const start = async () => {
  try {
    Model.knex(knex(dbConfig))
  } catch (err) {
    console.error(err)
  }
  server.listen(3001, () => {
    console.log('Listening on port 3001')
  })
}

start()

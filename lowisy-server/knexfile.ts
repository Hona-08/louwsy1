import * as dotenv from 'dotenv'
import { knexSnakeCaseMappers } from 'objection'

dotenv.config({
  path: '.env',
})

export default {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    stub: 'src/database/stubs/migration.stub',
    directory: 'src/database/migrations',
  },
  seeds: {
    stub: 'src/database/stubs/seed.stub',
    directory: 'src/database/seeds',
  },
  ...knexSnakeCaseMappers(),
}

import { knexSnakeCaseMappers } from 'objection'

export const dbConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    charset: 'utf8mb4',
  },
  pool: {
    max: 20,
    min: 2,
  },
  ...knexSnakeCaseMappers(),
} as const

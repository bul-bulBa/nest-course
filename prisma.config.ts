import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // url: env('DATABASE_URL'),
    url: "postgresql://root:123456@localhost:5433/nestjs-course?schema=public"
  },
})

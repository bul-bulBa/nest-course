import 'dotenv/config';
import { defineConfig } from 'prisma/config';
export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: "postgresql://root:123456@localhost:5433/nestjs-course?schema=public"
    },
});
//# sourceMappingURL=prisma.config.js.map
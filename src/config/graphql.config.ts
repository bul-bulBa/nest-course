import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
import { GqlModuleOptions } from "@nestjs/graphql";
import { join } from "path";
import { isDev } from "src/utils/is-dev.utils";

export async function getGraphQLConfig(
    configService: ConfigService
): Promise<ApolloDriverConfig> {
    return {
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: isDev(configService),
        context: ({ req, res }) => ({ req, res }),
    }
}
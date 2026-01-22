import { DocumentBuilder } from "@nestjs/swagger";

export function getSwaggerConfig() {
    return new DocumentBuilder()
    .setTitle('auth api')
    .setDescription('authorization api docs')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
}
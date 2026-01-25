import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./infra/prisma/prisma.service";

@Injectable()
export class AppService{
    constructor(private readonly prismaService: PrismaService) {}

    async getLnkByShortCode(code: string) {
        const link = await this.prismaService.link.findUnique({
            where: {
                shortCode: code
            }
        })

        if(!link)
            throw new NotFoundException('url is not found')

        return link
    }

    async trackClick(code: string, ipAddress: string, userAgent: string) {
        const link = await this.getLnkByShortCode(code)

        await this.prismaService.click.create({
            data: {
                ipAddress,
                userAgent,
                link: {
                    connect: {
                        id: link.id
                    }
                }
            }
        })
    }
}
import { Injectable } from '@nestjs/common';
import { lookup } from 'geoip-country';
import { formatName } from 'src/common/utils';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UAParser } from 'ua-parser-js'

@Injectable()
export class StatisticsService {
    private readonly parser: UAParser

    constructor(private readonly prismaService: PrismaService) {
        this.parser = new UAParser()
    }

    async getBrowserStats(id: string) {
        const clicks = await this.getClicks(id)

        const stats = clicks.reduce((acc, clicks) => {
            const { browser } = this.getBrowserByUserAgent(clicks.userAgent)
            
            if(acc[browser]) acc[browser] += 1
            else {
                acc[browser] = 1
            }

            return acc
        }, {})

        return stats
    }

    async getCountryStats(id: string) {
        const clicks = await this.getClicks(id)

        const stats = clicks.reduce((acc, clicks) => {
            const { country } = this.getCountryByIp(clicks.ipAddress)
            
            if(acc[country]) acc[country] += 1
            else {
                acc[country] = 1
            }

            return acc
        }, {})

        return stats
    }

    private async getClicks(linkId: string) {
        const clicks = await this.prismaService.click.findMany({
            where: {
                linkId
            }
        })

        return clicks
    }

    private getBrowserByUserAgent(userAgent: string) {
        this.parser.setUA(userAgent)

        const result = this.parser.getResult()

        return { browser: formatName(result.browser.name ?? '') }
    }

    private getCountryByIp(ip: string) {
        const geo = lookup(ip)

        return { country: formatName(geo.name), }
    }
}

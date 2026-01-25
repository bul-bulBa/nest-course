import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name)

    @Cron(CronExpression.EVERY_10_SECONDS)
    handleCron() {
        this.logger.log('CRON task in being performed every 10s')
    }

    @Interval(1000)
    handleInterval() {
        this.logger.log('CRON task in being performed every second')
    }

    @Timeout(5000)
    handleTimeout() {
        this.logger.log('Timeout task in being performed 5s after the start')
    }
}

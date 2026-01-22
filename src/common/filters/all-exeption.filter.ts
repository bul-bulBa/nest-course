import { ArgumentsHost, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Response } from "express";
import { timestamp } from "rxjs";

export class AllExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionFilter.name)
    
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()

        const response = ctx.getResponse() as Response

        const status = exception instanceof HttpException 
        ? exception.getStatus() : 5000

        const message = exception instanceof HttpException 
        ? exception.message : 'Internal server error'

        this.logger.error(message, exception)

        response.status(status).json({
            status, message,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url
        })
    }
}
import { Body, Controller, Get, Post, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ToLowerCasePipe } from './common/pipes/to.lower.case.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decorator';
import { AllExceptionFilter } from './common/filters/all-exeption.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

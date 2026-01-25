import { Body, Controller, Get, 
  HttpCode, HttpStatus, Post, Req, 
  Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest, LoginRequest } from './dto';
import type { Request, Response } from 'express';
import { ApiBadRequestResponse, 
  ApiConflictResponse, 
  ApiNotFoundResponse, 
  ApiOkResponse, 
  ApiOperation, 
  ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Authorization } from '../../common/decorators';
import { Authorized } from '../../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({
    summary: 'account creation',
    description: 'create user account'
  })
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'incorrect request data'})
  @ApiConflictResponse({ description: 'user with this email already exists'})
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest
  ) {
    return await this.authService.register(res, dto)
  }


  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'incorrect request data'})
  @ApiNotFoundResponse({ description: 'user is no found'})
  @ApiOperation({
    summary: 'login',
    description: 'login user and give access/refresh tokens'
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest
  ) {
    return await this.authService.login(res, dto)
  }


  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'invalid refresh token'})
  @ApiOperation({
    summary: 'update access token',
    description: 'generate new access token'
  })
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return await this.authService.refresh(req, res)
  }


  @ApiOperation({
    summary: 'logout',
    description: 'delete tokens'
  })
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res)
  }

  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('name') name: string) {
    return { name }
  }
}

import { Controller, Get, Post, Patch, Put, Query, Body, Headers, Req, Res, Param, Delete, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Movie')
@Controller({ path: 'movies' })
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'get all films',
    description: 'response all active films'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'films was finded',
  })
  @Get()
  findAll() {
    return this.movieService.findAll()
  }

  @ApiOperation({
    summary: 'get film by id',
    description: 'response 1 film by id'
  })
  @ApiParam({name: 'id', type: 'string', description: 'film id'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'film was finded',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'film not found'})
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id)
  }

  @ApiOperation({ summary: 'create film'})
  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id)
  }
}



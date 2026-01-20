import { Controller, Get, Post, Patch, Put, Query, Body, Headers, Req, Res, Param, Delete } from '@nestjs/common';
import type { Request, Response } from 'express';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';

@Controller({ path: 'movies' })
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id)
  }

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



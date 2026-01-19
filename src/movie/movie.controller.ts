import { Controller, Get, Query } from '@nestjs/common';

@Controller({
  path: 'movies'
})
export class MovieController {

  @Get()
  findAll(@Query('film') film: string) {
    return film
    ? `films in genre: ${film}`
    : [
      {
        title: 'fight club',
      },
      {
        title: 'Pulp Fiction',
      }
    ]
  }

}



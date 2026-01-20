import { Controller } from '@nestjs/common';
import { ActorService } from './actor.service';
import { Post, Body } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) { }

  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorService.create(dto)
  }
}

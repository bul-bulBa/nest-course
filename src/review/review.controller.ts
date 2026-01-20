import { Controller } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Post, Body } from '@nestjs/common';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
    create(@Body() dto: CreateReviewDto) {
      return this.reviewService.create(dto)
    }
}

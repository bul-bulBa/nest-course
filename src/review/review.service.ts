import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from 'generated/prisma/client';
import { connect } from 'http2';

@Injectable()
export class ReviewService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(dto: CreateReviewDto): Promise<Review> {
        const { movieId, text, rating } = dto

        const review = await this.prismaService.review.create({
            data: {
                text,
                rating,
                movie: {
                    connect: {
                        id: movieId
                    }
                }
            }
        })

        return review
    }
}

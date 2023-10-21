import { Body, Controller, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('rating')
@ApiTags('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Post()
    create(@Body() createRatingDto: CreateRatingDto) {
        return this.ratingService.create(createRatingDto);
    }
}
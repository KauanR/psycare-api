import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from '@psycare/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Rating])],
    controllers: [RatingController],
    providers: [RatingService],
})
export class RatingModule {}

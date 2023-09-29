import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalDto } from './create-professional.dto';
import { IsArray, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateProfessionalDto extends PartialType(CreateProfessionalDto) {
    @IsArray()
    @IsNotEmpty()
    languages: string[];

    @IsString()
    @IsNotEmpty()
    abstract: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    expericences: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    specializations: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    description: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    historic: string;
}

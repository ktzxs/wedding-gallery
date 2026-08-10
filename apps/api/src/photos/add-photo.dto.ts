import {
    IsString,
    IsOptional,
    MaxLength
} from 'class-validator';

export class AddPhotoDto {
    @IsString()
    @MaxLength(50)
    @IsOptional()
    guestName?: string;
}

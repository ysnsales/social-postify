import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsInt()
  mediaId: number;

  @IsInt()
  postId: number;

  @IsDateString()
  date: Date;
}
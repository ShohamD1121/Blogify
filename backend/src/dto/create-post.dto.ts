import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly desc: string;

  @IsString()
  readonly img: string;

  readonly createdAt: string;

  readonly uid: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly cat: string;
}

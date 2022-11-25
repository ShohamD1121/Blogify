import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'src/schema/posts.schema';
import { PostsController } from 'src/controllers/posts.controller';
import { PostsService } from 'src/services/posts.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'post', schema: PostSchema }])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

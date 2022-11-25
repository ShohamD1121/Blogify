import {
  Controller,
  Post as PostReq,
  UseGuards,
  Body,
  Put,
  Res,
  Param,
  HttpStatus,
  Get,
  Delete,
  UseInterceptors,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { PostsService } from 'src/services/posts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Post } from 'src/schema/posts.schema';
import { UpdatePostDto } from 'src/dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @PostReq()
  async createPost(
    @Req() request,
    @Res() response,
    @Body() createPost: CreatePostDto,
  ): Promise<Post> {
    try {
      const newPost = await this.postsService.createPost({
        ...createPost,
        uid: request.user.userId,
      });
      return response.status(HttpStatus.OK).json({
        message: 'Post has been created successfully',
        newPost,
      });
    } catch (error) {
      console.log('ad');

      return response.status(error.status).json(error.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @PostReq('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../frontend/public/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() response) {
    return response.status(HttpStatus.OK).json(file.filename);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updatePost(
    @Req() request,
    @Res() response,
    @Param('id') postId: string,
    @Body() updatePost: UpdatePostDto,
  ) {
    console.log('hello');

    try {
      const existingPost = await this.postsService.updatePost(
        postId,
        updatePost,
        request.user.userId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Post has been successfully updated',
        existingPost,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/:cat')
  async getPosts(@Param('cat') cat: string, @Res() response) {
    try {
      const postData = await this.postsService.getPosts(cat);
      return response.status(HttpStatus.OK).json({
        message: 'All posts data found successfully',
        postData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/:id')
  async getPost(@Res() response, @Param('id') postId: string) {
    try {
      const existingPost = await this.postsService.getPost(postId);
      return response.status(HttpStatus.OK).json({
        message: 'Post found successfully',
        existingPost,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(
    @Req() request,
    @Res() response,
    @Param('id') postId: string,
  ) {
    try {
      const deletedPost = await this.postsService.deletePost(
        postId,
        request.user.userId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Post deleted successfully',
        deletedPost,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}

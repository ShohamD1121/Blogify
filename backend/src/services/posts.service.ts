import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { UpdatePostDto } from 'src/dto/update-post.dto';
import { PostDocument, Post } from 'src/schema/posts.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private readonly postModel: Model<PostDocument>,
  ) {}

  async createPost(createPost: CreatePostDto) {
    return this.postModel.create(createPost);
  }

  async updatePost(
    postId: string,
    updatePost: UpdatePostDto,
    uid: string,
  ): Promise<Post> {
    const post = await this.postModel.findById(postId);
    if (uid !== post.uid.toHexString())
      throw new NotFoundException("You're not Authorized to update this post");

    const existingPost = await this.postModel.findByIdAndUpdate(
      postId,
      updatePost,
      { new: true },
    );
    if (!existingPost) {
      throw new NotFoundException(`Post #${postId} not found`);
    }
    return existingPost;
  }

  async getPosts(cat: string): Promise<Post[]> {
    const postData =
      cat === 'all'
        ? await this.postModel.find()
        : await this.postModel.find({ cat: cat });
    if (!postData || postData.length === 0) {
      throw new NotFoundException('This category has 0 Posts');
    }
    return postData;
  }

  async getPost(postId: string): Promise<Post> {
    const existingPost = await this.postModel.findById(postId).exec();
    if (!existingPost) {
      throw new NotFoundException(`Post #${postId} not found`);
    }
    return existingPost;
  }

  async deletePost(postId: string, uid: string): Promise<Post> {
    const post = await this.postModel.findById(postId);
    if (uid !== post.uid.toHexString())
      throw new NotFoundException("You're not Authorized to delete this post");

    const deletedPost = await this.postModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      throw new NotFoundException(`Post #${postId} not found`);
    }
    return deletedPost;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(username: string, password: string, email: string) {
    return this.userModel.create({
      username,
      password,
      email,
    });
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async getUsers(): Promise<any> {
    return this.userModel.find();
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { User } from 'src/schema/users.schema';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() createUser: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(createUser.password, saltOrRounds);
    const result = await this.userService.createUser(
      createUser.username,
      hashPassword,
      createUser.email,
    );
    return result;
  }

  @Get()
  async getUsers(@Res() response) {
    try {
      const users = await this.userService.getUsers();
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        usersData: users,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}

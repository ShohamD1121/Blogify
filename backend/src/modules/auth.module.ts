import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { UserSchema } from 'src/schema/users.schema';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { UsersService } from 'src/services/users.service';
import { LocalStrategy } from 'src/auth/local.auth';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.Secret_Key,
      signOptions: { expiresIn: '1days' },
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

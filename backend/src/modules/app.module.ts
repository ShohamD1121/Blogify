import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { PostsModule } from './posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.Mongo_URL, {
      dbName: 'Blogify',
    }),
    MulterModule.register({ dest: './uploads' }),
    PostsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { RouterModule } from '@nestjs/core';
import path from 'path';

const Routes = [
  {path:"book",module:BookModule}
]

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    BookModule,
    AuthModule,
    RouterModule.register(Routes)
  ],
  // controllers: [BookController],
})
export class AppModule {}

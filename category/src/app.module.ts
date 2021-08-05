import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './categories/category.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CategoryModule,MongooseModule.forRoot('mongodb://localhost:27017/Category')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

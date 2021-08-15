import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseManagerModule } from './expense-manager/expense-manager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ExpenseManagerModule,MongooseModule.forRoot('mongodb://localhost:27017/ExpenseManager'),
  ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

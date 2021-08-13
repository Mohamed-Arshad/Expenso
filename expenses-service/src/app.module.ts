import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Expenses'), ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

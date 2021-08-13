import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './Services/expenses.service';
import { ExpensesRepository } from './Repository/expenses.Repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './Schemas/Expenses.Schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }])],
  controllers: [ExpensesController],
  providers: [ExpensesService,ExpensesRepository]
})
export class ExpensesModule {}

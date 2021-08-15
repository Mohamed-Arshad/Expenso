import { HttpModule, Module } from '@nestjs/common';
import { ExpenseManagerController } from './expense-manager.controller';
import { ExpenseManagerService } from './services/expense-manager.service';
import { ExpenseManagerRepository } from './Repository/expense-manager.Repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseManager, ExpenseManagerSchema } from './schemas/expensemanager.schema';
import { TaskShedulerService } from './services/task-sheduler.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ExpenseManager.name, schema: ExpenseManagerSchema}]),HttpModule],
  controllers: [ExpenseManagerController],
  providers: [ExpenseManagerService,ExpenseManagerRepository,TaskShedulerService]
})
export class ExpenseManagerModule {}

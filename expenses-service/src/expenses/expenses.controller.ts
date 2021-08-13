import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddExpensesDto } from './DTO/addExpenses.dto';
import { FindFilterDto } from './DTO/findFilter.dto';
import { UpdateExpensesDto } from './DTO/updateExpenses.dto';
import { UpdatevalidationPipe } from './pipes/updatevalidation.pipe';
import { Expense } from './Schemas/Expenses.Schema';
import { ExpensesService } from './Services/expenses.service';

@Controller('expenses')
export class ExpensesController {

    constructor(private expenseService:ExpensesService){};

    @Post()
    async addExpense(@Body() addExpensesDto:AddExpensesDto):Promise<Expense>{
        return await this.expenseService.addExpense(addExpensesDto);
    }

    @Get()
    async findAllExpenses(@Query() filter:FindFilterDto):Promise<Expense[]>{
        if (Object.keys(filter).length){
            return await this.expenseService.findWithFilters(filter);
        }
        return await this.expenseService.findAllExpenses();
    }

    @Get('/:id')
    async findExpenseById(@Param('id') id:string):Promise<Expense>{
        return await this.expenseService.findExpenseById(id);
    }

    @Put('/:id')
    @UsePipes(UpdatevalidationPipe)
    async UpdateExpenses(@Param('id') id:string,@Body() updateExpensesDto:UpdateExpensesDto):Promise<Expense>{
        return await this.expenseService.UpdateExpenses(id,updateExpensesDto);
    }

    @Delete('/:id')
    async deleteExpenseById(@Param('id') id:string):Promise<Expense>{
        return await this.expenseService.DeleteExpenses(id);
    }

}

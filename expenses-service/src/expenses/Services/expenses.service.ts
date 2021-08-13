import { Injectable } from '@nestjs/common';
import { AddExpensesDto } from '../DTO/addExpenses.dto';
import { FindFilterDto } from '../DTO/findFilter.dto';
import { UpdateExpensesDto } from '../DTO/updateExpenses.dto';
import { ExpensesRepository } from '../Repository/expenses.Repository';
import { Expense } from '../Schemas/Expenses.Schema';

@Injectable()
export class ExpensesService {

    constructor(private expensesRepository:ExpensesRepository){}

    async addExpense(addExpensesDto:AddExpensesDto):Promise<Expense>{
        return await this.expensesRepository.add(addExpensesDto);
    }

    async findExpenseById(id:string):Promise<Expense>{
        return await this.expensesRepository.findById(id);
    }

    async findAllExpenses():Promise<Expense[]>{
        return await this.expensesRepository.findAll();
    }

    async UpdateExpenses(id:string,updateExpensesDto:UpdateExpensesDto):Promise<Expense>{
        return await this.expensesRepository.updateById(id,updateExpensesDto);
    }

    async findWithFilters(filter:FindFilterDto):Promise<Expense[]>{
        return await this.expensesRepository.findWithFilters(filter);
    }

    async DeleteExpenses(id:string):Promise<Expense>{
        return await this.expensesRepository.deleteById(id);
    }
}

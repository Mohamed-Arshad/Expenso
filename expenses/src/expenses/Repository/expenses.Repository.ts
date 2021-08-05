import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddExpensesDto } from '../DTO/addExpenses.dto';
import { FindFilterDto } from '../DTO/findFilter.dto';
import { UpdateExpensesDto } from '../DTO/updateExpenses.dto';
import { Expense, ExpenseDocument } from '../Schemas/Expenses.Schema';

@Injectable()
export class ExpensesRepository {
    constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>){}

    async add(addExpensesDto:AddExpensesDto):Promise<Expense>{
        return await new this.expenseModel(addExpensesDto).save();
    }

    async findById(id:string):Promise<Expense>{
        return await this.expenseModel.findById(id);
    }

    async findAll():Promise<Expense[]>{
        return await this.expenseModel.find();
    }

    async updateById(id:string,updateExpensesDto:UpdateExpensesDto):Promise<Expense>{
        return await this.expenseModel.findByIdAndUpdate(id,updateExpensesDto,{
            new: true
        });
    }

    async findWithFilters({id}:FindFilterDto):Promise<Expense[]>{
        let expenses:Expense[]=[];
        for(let i=0;i<id.length;i++){
            expenses.push(await this.findById(id[i]));
        }
        return await expenses;
    }

    async deleteById(id:string):Promise<Expense>{
        return await this.expenseModel.findByIdAndDelete(id);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddCategoryDto } from '../DTO/addCategory.dto';
import { ChangeLimitDto } from '../DTO/changeLimit.dto';
import { ExpenseDto } from '../DTO/expense.dto';
import { Category, CategoryDocument } from '../schemas/categories.schema';

@Injectable()
export class CategoriesRepository {

    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

    async add(addCategoryDto:AddCategoryDto):Promise<Category>{
        return await new this.categoryModel(addCategoryDto).save();
    }

    async changeLimit(id:string, changeLimitDto:ChangeLimitDto):Promise<Category>{
        return await this.categoryModel.findByIdAndUpdate(id,changeLimitDto,{
            new: true
        });
    }

    async AddExpense(id:string,addExpenseDto:ExpenseDto):Promise<Category>{
        return await this.categoryModel.findByIdAndUpdate(id,{$push:{Expenses:addExpenseDto.Id}},{
            new: true
        });
    }

    async DeleteExpense(id:string,deleteExpenseDto:ExpenseDto):Promise<Category>{
        return await this.categoryModel.findByIdAndUpdate(id,{$pull:{Expenses:deleteExpenseDto.Id}},{
            new: true
        });
    }

    async findAll():Promise<Category[]>{
        return await this.categoryModel.find();
    }
    
    async findById(id:string):Promise<Category>{
        return await this.categoryModel.findById(id);
    }
}

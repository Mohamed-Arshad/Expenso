import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from '../Dto/category.dto';
import { ChangeLimitDto } from '../Dto/ChangeLimit.dto';
import { createExpenseManagerDto } from '../Dto/createExpenseManager.dto';
import { ExpenseManager, ExpenseManagerDocument } from '../schemas/expensemanager.schema';

@Injectable()
export class ExpenseManagerRepository {
    constructor(@InjectModel(ExpenseManager.name) private ExpenseManagerModel: Model<ExpenseManagerDocument>) {}

    async add(createExpenseManager:createExpenseManagerDto):Promise<ExpenseManager>{
        return new this.ExpenseManagerModel(createExpenseManager).save();
    }

    async changeLimit(id:string, changeLimitDto:ChangeLimitDto):Promise<ExpenseManager>{
        return await this.ExpenseManagerModel.findByIdAndUpdate(id,changeLimitDto,{
            new: true
        });
    }

    async AddCategory(id:string,addCategoryDto:CategoryDto):Promise<ExpenseManager>{
        return await this.ExpenseManagerModel.findByIdAndUpdate(id,{$push:{Categories:addCategoryDto.Id}},{
            new: true
        });
    }

    async DeleteCategory(id:string,deleteCategoryDto:CategoryDto):Promise<ExpenseManager>{
        return await this.ExpenseManagerModel.findByIdAndUpdate(id,{$pull:{Categories:deleteCategoryDto.Id}},{
            new: true
        });
    }

    async findAll():Promise<ExpenseManager[]>{
        return await this.ExpenseManagerModel.find();
    }
    
    async findById(id:string):Promise<ExpenseManager>{
        return await this.ExpenseManagerModel.findById(id);
    }

    async deleteById(id:string):Promise<ExpenseManager>{
        return await this.ExpenseManagerModel.findByIdAndDelete(id);
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AddCategoryDto } from './DTO/addCategory.dto';
import { CategoryFilterDto } from './DTO/categoryFilter.dto';
import { ChangeLimitDto } from './DTO/changeLimit.dto';
import { ExpenseDto } from './DTO/expense.dto';
import { ExpenseAmountDto } from './DTO/expenseAmount.dto';
import { ExpenseStatusDto } from './DTO/expenseStatus.dto';
import { Category } from './schemas/categories.schema';
import { CategoriesService } from './services/categories.service';

@Controller('categories')
export class CategoriesController {

    constructor(private categoryService:CategoriesService){}

    @Post()
    async addCategory(@Body() addCategoryDto:AddCategoryDto):Promise<Category>{
        return await this.categoryService.addCategory(addCategoryDto);
    }
    @Put('/changeLimit/:id')
    async changeLimit(@Param('id') id:string, @Body() changeLimitDto:ChangeLimitDto):Promise<Category>{
        return await this.categoryService.changeLimit(id,changeLimitDto);
    }
    @Put('/addExpense/:id')
    async addExpense(@Param('id') id:string, @Body() addExpenseDto:ExpenseDto):Promise<Category>{
        return await this.categoryService.addExpense(id,addExpenseDto);
    }
    @Put('/deleteExpense/:id')
    async deleteExpense(@Param('id') id:string, @Body() deleteExpenseDto:ExpenseDto):Promise<Category>{
        return await this.categoryService.deleteExpense(id,deleteExpenseDto);
    }
    @Put('/moveExpense')
    async moveExpense(@Query('from') from:string,@Query('to') to:string,@Body() moveExpenseDto:ExpenseDto):Promise<Category>{
        return await this.categoryService.moveExpense(from,to,moveExpenseDto);
    }
    @Get()
    async viewCategory(@Query() filter:CategoryFilterDto):Promise<Category[]>{
        if (Object.keys(filter).length){
            return await this.categoryService.getCategoryByFilters(filter);
        }
        return await this.categoryService.getAllCategory();
    }
    @Get('/:id')
    async viewCategoryById(@Param('id') id:string):Promise<Category>{
        return await this.categoryService.getCategoryById(id);
    }
    @Get('/viewExpense/:id')
    async viewExpenses(@Param('id') id:string):Promise<any>{
        return await this.categoryService.viewExpenses(id);
    }
    @Get('/calculateExpense/:id')
    async calculateTotalExpense(@Param('id') id:string):Promise<ExpenseAmountDto>{
        return await this.categoryService.calculateTotalExpense(id);
    }
    @Get('/GetExpenseStatus/:id')
    async GetExpenseStatus(@Param('id') id:string):Promise<ExpenseStatusDto>{
        return await this.categoryService.findExpenseStatus(id);
    }
    @Delete()
    async deleteCategoryById(@Param('id') id:string):Promise<Category>{
        return await this.categoryService.deleteCategoryById(id);
    }
}

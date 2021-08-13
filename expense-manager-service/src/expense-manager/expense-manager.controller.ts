import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryDto } from './Dto/category.dto';
import { ChangeLimitDto } from './Dto/ChangeLimit.dto';
import { createExpenseManagerDto } from './Dto/createExpenseManager.dto';
import { ExpenseStatusDto } from './Dto/expenseStatus.dto';
import { ExpenseManager } from './schemas/expensemanager.schema';
import { ExpenseManagerService } from './services/expense-manager.service';

@Controller('expense-manager')
export class ExpenseManagerController {
    constructor(private expenseManagerService:ExpenseManagerService){}

    @Post()
    async add(@Body() createExpenseManager:createExpenseManagerDto):Promise<ExpenseManager>{
        return this.expenseManagerService.add(createExpenseManager);
    }

    @Put('/changeLimit/:id')
    async changeLimit(@Param('id') id:string, @Body() changeLimitDto:ChangeLimitDto):Promise<ExpenseManager>{
        return await this.expenseManagerService.changeLimit(id,changeLimitDto);
    }

    @Put('/addCategory/:id')
    async AddCategory(@Param('id') id:string, @Body() addCategoryDto:CategoryDto):Promise<ExpenseManager>{
        return await this.expenseManagerService.AddCategory(id,addCategoryDto);
    }

    @Put('/deleteCategory/:id')
    async DeleteCategory(@Param('id') id:string, @Body() deleteCategoryDto:CategoryDto):Promise<ExpenseManager>{
        return await this.expenseManagerService.DeleteCategory(id,deleteCategoryDto);
    }

    @Get('/viewCategories/:id')
    async viewCategories(@Param('id') id:string):Promise<any[]>{
        return await this.expenseManagerService.viewCategories(id);
    }

    @Get('/viewAllExpenses/:id')
    async viewAllExpenses(@Param('id') id:string):Promise<any>{
        return await this.expenseManagerService.viewAllExpenses(id);
    }

    @Get('/calculateAllExpenses/:id')
    async calculateAllExpenses(@Param('id') id:string):Promise<any>{
        return await this.expenseManagerService.calculateAllExpenses(id);
    }

    @Get('/viewStatus/:id')
    async viewStatus(@Param('id') id:string):Promise<ExpenseStatusDto>{
        return this.expenseManagerService.viewStatus(id);
    }

    @Get()
    async findAll():Promise<ExpenseManager[]>{
        return await this.expenseManagerService.findAll();
    }

    @Get('/:id')
    async findById(@Param('id') id:string):Promise<ExpenseManager>{
        return await this.expenseManagerService.findById(id);
    }

    //unwanted method
    // async deleteById(@Param('id') id:string):Promise<ExpenseManager>{
    //     return await this.expenseManagerService.findByIdAndDelete(id);
    // }
}

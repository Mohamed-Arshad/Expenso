import { HttpService, Injectable } from '@nestjs/common';
import { AddCategoryDto } from '../DTO/addCategory.dto';
import { ChangeLimitDto } from '../DTO/changeLimit.dto';
import { ExpenseDto } from '../DTO/expense.dto';
import { ExpenseAmountDto} from '../DTO/expenseAmount.dto';
import { ExpenseStatusDto } from '../DTO/expenseStatus.dto';
import { CategoriesRepository } from '../Repository/categories.Repository';
import { Category } from '../schemas/categories.schema';

@Injectable()
export class CategoriesService {

    constructor(private categoryRepository:CategoriesRepository,private httpService: HttpService){}

    async addCategory(addCategoryDto:AddCategoryDto):Promise<Category>{
        return await this.categoryRepository.add(addCategoryDto);
    }

    async changeLimit(id:string, changeLimitDto:ChangeLimitDto):Promise<Category>{
        return await this.categoryRepository.changeLimit(id,changeLimitDto);
    }

    async addExpense(id:string,addExpenseDto:ExpenseDto):Promise<Category>{
        return await this.categoryRepository.AddExpense(id,addExpenseDto);
    }

    async deleteExpense(id:string,deleteExpenseDto:ExpenseDto):Promise<Category>{
        return await this.categoryRepository.DeleteExpense(id,deleteExpenseDto);
    }

    async moveExpense(from:string,to:string,moveExpenseDto:ExpenseDto):Promise<Category>{
        await this.deleteExpense(from,moveExpenseDto);
        return await this.addExpense(to,moveExpenseDto);
    }

    async getAllCategory():Promise<Category[]>{
        return await this.categoryRepository.findAll();
    }

    async getCategoryById(id:string):Promise<Category>{
        return await this.categoryRepository.findById(id);
    }

    async viewExpenses(id:string):Promise<any>{
        const {Expenses}=await this.getCategoryById(id);
        let url="http://localhost:3000/expenses?"+Expenses.map((id)=>{return "id="+id}).join('&');
        return await this.httpService.get(url).toPromise().then(res=>{
            return res.data;
        });
    }

    async calculateTotalExpense(id:string):Promise<ExpenseAmountDto>{
        const expenses=await this.viewExpenses(id);
        let total=new ExpenseAmountDto();
        expenses.forEach(({Amount})=>{
            total.Amount+=Amount;
        });
        return total;
    }

    async findExpenseStatus(id:string):Promise<ExpenseStatusDto>{
        const {MaxAmountLimit}= await this.getCategoryById(id);
        const {Amount}=await this.calculateTotalExpense(id);
        let status=new ExpenseStatusDto();
        if(Amount>=MaxAmountLimit){
            status.Status="Exceeded";
            return status;
        }
        status.Status="Not Exceeded";
        return status;
    }
}

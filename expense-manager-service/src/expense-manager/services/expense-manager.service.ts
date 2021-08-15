import { HttpService, Injectable } from '@nestjs/common';
import { CategoryDto } from '../Dto/category.dto';
import { ChangeLimitDto } from '../Dto/ChangeLimit.dto';
import { createExpenseManagerDto } from '../Dto/createExpenseManager.dto';
import { ExpenseAmountDto } from '../Dto/expenseAmount.dto';
import { ExpenseStatusDto } from '../Dto/expenseStatus.dto';
import { ExpenseManagerRepository } from '../Repository/expense-manager.Repository';
import { ExpenseManager } from '../schemas/expensemanager.schema';

@Injectable()
export class ExpenseManagerService {
    constructor(private expensManagerRepository: ExpenseManagerRepository, private httpService: HttpService) { }

    async add(createExpenseManager: createExpenseManagerDto): Promise<ExpenseManager> {
        const expenseManager = await this.expensManagerRepository.add(createExpenseManager);
        let url = "http://localhost:3100/categories";
        let category = await this.httpService.post(url, { "ProfileId": expenseManager.ProfileId, "Name": "Others", "MaxAmountLimit": -1, "CreatedDate": new Date() }).toPromise().then(res => {
            return res.data
        });
        let categoryid = new CategoryDto();
        categoryid.Id = category._id;
        await this.AddCategory(expenseManager._id, categoryid);
        return expenseManager;
    }

    async changeLimit(id: string, changeLimitDto: ChangeLimitDto): Promise<ExpenseManager> {
        return await this.expensManagerRepository.changeLimit(id, changeLimitDto);
    }

    async AddCategory(id: string, addCategoryDto: CategoryDto): Promise<ExpenseManager> {
        return await this.expensManagerRepository.AddCategory(id, addCategoryDto);
    }

    async DeleteCategory(id: string, deleteCategoryDto: CategoryDto): Promise<ExpenseManager> {
        return await this.expensManagerRepository.DeleteCategory(id, deleteCategoryDto);
    }

    async viewCategories(id: string): Promise<any[]> {
        const { Categories } = await this.findById(id);
        let url = "http://localhost:3100/categories?" + Categories.map((id) => { return "id=" + id }).join('&');
        return await this.httpService.get(url).toPromise().then(res => {
            return res.data;
        });
    }

    async viewAllExpenses(id: string): Promise<any> {
        const { Categories } = await this.findById(id);
        let AllExpenses = [];
        await Promise.all(Categories.map(async (id) => {
            let url = "http://localhost:3100/categories/viewExpense/" + id;
            await this.httpService.get(url).toPromise().then(res => {
                AllExpenses = AllExpenses.concat(res.data);
            });
        }));
        return AllExpenses;
    }

    async calculateAllExpenses(id: string): Promise<ExpenseAmountDto> {
        const { Categories } = await this.findById(id);
        let total = new ExpenseAmountDto();
        await Promise.all(Categories.map(async (id) => {
            let url = "http://localhost:3100/categories/calculateExpense/" + id;
            await this.httpService.get(url).toPromise().then(res => {
                total.Amount += res.data.Amount;
            });
        }));
        return total;
    }

    async viewStatus(id: string): Promise<ExpenseStatusDto> {
        const { MaxAmountLimit } = await this.findById(id);
        const { Amount } = await this.calculateAllExpenses(id);
        let status = new ExpenseStatusDto();
        if (Amount >= MaxAmountLimit) {
            status.Status = "Exceeded";
            return status;
        }
        status.Status = "Not Exceeded";
        return status;
    }

    async findAll(): Promise<ExpenseManager[]> {
        return await this.expensManagerRepository.findAll();
    }

    async findById(id: string): Promise<ExpenseManager> {
        return await this.expensManagerRepository.findById(id);
    }

    //unwanted method
    // async deleteById(id:string):Promise<ExpenseManager>{
    //     return await this.expensManagerRepository.findByIdAndDelete(id);
    // }
}

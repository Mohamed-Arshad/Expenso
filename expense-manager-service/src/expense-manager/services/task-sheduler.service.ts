import { HttpService, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { createExpenseManagerDto } from '../Dto/createExpenseManager.dto';
import { ExpenseManagerService } from './expense-manager.service';

@Injectable()
export class TaskShedulerService {
    constructor(private httpService: HttpService,private expenseManager:ExpenseManagerService){}

    @Cron('* * * 1 * *')
    async handleCron() {
        let url="http://localhost:3500/profile";
        let profile=await this.httpService.get(url).toPromise().then(res=>{
            return res.data;
        });
        await Promise.all(profile.map(async (pro)=>{
            let expenseManager= new createExpenseManagerDto();
            expenseManager.ProfileId=pro._id;
            expenseManager.MaxAmountLimit=-1;
            expenseManager.CreatedDate=new Date();
            await this.expenseManager.add(expenseManager);
        }));
    }
}

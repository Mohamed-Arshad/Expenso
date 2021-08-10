const { RESTDataSource } = require('apollo-datasource-rest');

class ExpenseManagerApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3200/expense-manager/';
    }

    async getExpenseManagerByid(id) {
        return await this.get(`${id}`);
    }

    async viewCategories(id) {
        return await this.get(`/viewCategories/${id}`);
    }

    async viewAllExpenses(id){
        return await this.get(`/viewAllExpenses/${id}`);
    }

    async calculateAllExpenses(id){
        const total= await this.get(`/calculateAllExpenses/${id}`);
        return total.Amount;
    }

    async viewStatus(id){
        const Res=await this.get(`/viewStatus/${id}`);
        return Res.Status;
    }
}

module.exports = ExpenseManagerApi;
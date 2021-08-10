const { RESTDataSource } = require('apollo-datasource-rest');

class CategoryApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3100/categories';
    }

    async viewCategory(filter){
        return await this.get(`${filter}`);
    }

    async viewCategoryById(id){
        return await this.get(`${id}`);
    }

    async viewExpenses(id){
        return await this.get(`/viewExpense/${id}`);
    }

    async calculateTotalExpense(id){
        const total=await this.get(`/calculateExpense/${id}`);
        return total.Amount;
    }

    async GetExpenseStatus(id){
        const Res=await this.get(`/GetExpenseStatus/${id}`);
        return Res.Status;
    }
}

module.exports = CategoryApi;
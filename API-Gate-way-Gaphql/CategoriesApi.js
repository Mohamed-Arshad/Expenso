const { RESTDataSource } = require('apollo-datasource-rest');

class CategoryApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3100/categories';
    }

    //Get
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

    //Put
    async changeMaxLimit(args){
        return await this.put(
            `/changeLimit/${args.input.id}`, // path
            JSON.parse(JSON.stringify(args.input)), // request body
          );
    }

    async moveExpenses(args){
        return await this.put(
            `/moveExpense?from=${args.input.category_from}&to=${args.input.category_to}`, // path
            JSON.parse(JSON.stringify({"Id":args.input.expenseId})), // request body
          );
    }
}

module.exports = CategoryApi;
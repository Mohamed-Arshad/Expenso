const { RESTDataSource } = require('apollo-datasource-rest');

class ExpensesApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000/expenses';
    }

    //Get
    async findAllExpenses(filter){
        return await this.get(`${filter}`);
    }

    async findExpenseById(id){
        return await this.get(`${id}`);
    }

    //Put
    async updateExpenses(args){
        return await this.put(
            `/${args.input.id}`, // path
            JSON.parse(JSON.stringify(args.input)), // request body
          );
    }

}

module.exports = ExpensesApi;
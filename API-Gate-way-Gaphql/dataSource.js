const CategoryApi = require('./CategoriesApi');
const ExpenseManagerApi = require('./ExpenseManagerApi');
const ExpensesApi = require('./ExpensesAPI');

const dataSources = () => {
    return {
        expenseManagerApi: new ExpenseManagerApi(),
        categoryApi: new CategoryApi(),
        expensesApi: new ExpensesApi()
    }
};

module.exports = dataSources;
const resolvers = {
    Query: { //parent, args, context, info
        ExpenseManager(parent, { id }, { dataSources }, info) {
            return dataSources.expenseManagerApi.getExpenseManagerByid(id);
        },
        Category(parent, { id }, { dataSources }, info) {
            return dataSources.categoryApi.viewCategoryById(id);
        },
        Expenses(parent, { id }, { dataSources }, info) {
            return dataSources.expensesApi.findExpenseById(id);
        }
    },
    ExpenseManager: {
        Categories(expenseManager, args, { dataSources }, info) {
            let filterUrl = "?" + expenseManager.Categories.map((id) => `id=${id}`).join('&');
            return dataSources.categoryApi.viewCategory(filterUrl);
        },
        Status(expenseManager, args, { dataSources }, info) {
            return dataSources.expenseManagerApi.viewStatus(expenseManager._id);
        },
        CurrentAmount(expenseManager, args, { dataSources }, info) {
            return dataSources.expenseManagerApi.calculateAllExpenses(expenseManager._id);
        },
        AllExpenses(expenseManager, args, { dataSources }, info) {
            return dataSources.expenseManagerApi.viewAllExpenses(expenseManager._id);
        }
    },
    Category: {
        CurrentAmount(category, args, { dataSources }, info) {
            return dataSources.categoryApi.calculateTotalExpense(category._id);
        },
        Status(category, args, { dataSources }, info) {
            return dataSources.categoryApi.GetExpenseStatus(category._id);
        },
        Expenses(category, args, { dataSources }, info) {
            return dataSources.categoryApi.viewExpenses(category._id);
        }
    },
    Mutation: {
        UpdateExpense(parent, args, { dataSources }, info){
            return dataSources.expensesApi.updateExpenses(args);
        },
        changeCategoryMaxLimit(parent, args, { dataSources }, info){
            return dataSources.categoryApi.changeMaxLimit(args);
        },
        moveExpensesToAnotherCategory(parent, args, { dataSources }, info){
            return dataSources.categoryApi.moveExpenses(args);
        },
        changeExpenseManagerMaxLimit(parent, args, { dataSources }, info){
            return dataSources.expenseManagerApi.changeMaxLimit(args);
        }
    }
};

module.exports = resolvers;
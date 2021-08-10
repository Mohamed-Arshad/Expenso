const { ApolloServer, gql } = require('apollo-server');
const CategoryApi = require('./CategoriesApi');
const ExpenseManagerApi = require('./ExpenseManagerApi');
const ExpensesApi = require('./ExpensesAPI');

const typeDefs = gql`
    type Expenses {
        _id:ID
        Description: String
        Amount: Float
        Time: DateTime
    }
    
    scalar DateTime

    type Category{
        _id:ID
        Name: String
        MaxAmountLimit: Float
        CurrentAmount:Float
        Status:String
        Expenses:[Expenses]
    }

    type ExpenseManager{
        _id:ID
        ProfileId: ID
        MaxAmountLimit: Float
        CurrentAmount: Float
        Status: String
        CreatedDate: DateTime
        Categories:[Category]
        AllExpenses:[Expenses]
    }

    type Query {
        ExpenseManager(id: String): ExpenseManager
        Category (id:String): Category
        Expenses (id:String): Expenses
    }

    input InputUpdateExpense {
        id:ID
        Description: String
        Amount: Float
    }

    type Mutation{
        UpdateExpense(input:InputUpdateExpense):Expenses
    }
`;

const dataSources = () => {
    return {
        expenseManagerApi: new ExpenseManagerApi(),
        categoryApi: new CategoryApi(),
        expensesApi: new ExpensesApi()
    }
};

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
        }
    }
};


const gqlServer = new ApolloServer({ typeDefs, resolvers, dataSources });
gqlServer.listen(3300).then(({ url }) => console.log(`graphQL is started on ${url}`));
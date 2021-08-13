const { gql } = require('apollo-server');

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

    input InputChangeMaxLimit {
        id:ID
        MaxAmountLimit: Float
    }

    input InputMoveExpensesToAnotherCategory {
        category_from:ID
        category_to:ID
        expenseId:ID
    }

    type Mutation{
        UpdateExpense(input:InputUpdateExpense):Expenses
        changeCategoryMaxLimit(input: InputChangeMaxLimit):Category
        moveExpensesToAnotherCategory(input:InputMoveExpensesToAnotherCategory):Category
        changeExpenseManagerMaxLimit(input:InputChangeMaxLimit):ExpenseManager
    }
`;

module.exports = typeDefs;
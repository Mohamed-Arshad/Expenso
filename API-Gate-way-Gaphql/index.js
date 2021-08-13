const { ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const dataSources = require('./dataSource');
const resolvers = require('./resolver')

const gqlServer = new ApolloServer({ typeDefs, resolvers, dataSources });
gqlServer.listen(3300).then(({ url }) => console.log(`graphQL is started on ${url}`));
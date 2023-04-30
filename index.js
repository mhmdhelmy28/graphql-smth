const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const typeDefs = require('./src/graphql/type-def')
const resolvers = require('./src/graphql/resolvers')


async function startServer() {
  try { 
   
    
    const connection = await mongoose.connect('mongodb://localhost:27017/db');
    if (connection)
    console.log("Database Connected Successfully...");
    } catch (err) {
    console.log( "Error while connecting database\n");
    console.log(err);
    }
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  
    const { url } = await startStandaloneServer(server, {
      context: ({ req: {headers}}) => {
        // returns an object containing the necessary data for the resolvers
        return {headers}
      },
      listen: { port: 4000 },
    });
  
    console.log(`🚀  Server ready at: ${url}`);
  }
  
  startServer()

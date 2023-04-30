


module.exports = `#graphql

type Todo {
    _id: ID!
    title: String!
    done: Boolean!
    owner: User!
}

type User {
    _id: ID!
    name: String!
    email: String!
    todos: [Todo!]

}

type AuthPayload {
    user: User!
    token: String!
}

type Query {
    health: String!
    getTodos: [Todo!]
    getTodoById(id: ID!): Todo!
}

type Mutation {
    signUp(name: String!, email: String!, password: String!): AuthPayload!
    signIn(email: String!, password: String!): AuthPayload!
    createTodo(title: String!): Todo!
    updateTodo(id: ID!, title: String, done: Boolean): Todo!
    deleteTodo(id: ID!): Todo!
}
`

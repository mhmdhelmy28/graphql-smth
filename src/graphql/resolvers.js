const Todo = require('../models/todo')
const User = require('../models/user')
const  {getUserId, generateToken} = require('../utils/utils')
var ObjectId = require('mongodb').ObjectId; 

module.exports = {
    Query: {
        health: () => "Up and running",
        getTodos: async(_, __, context, ___) => {
            const userId = await getUserId(context)
            const todos = await Todo.find({ owner: userId })
            console.log(todos)
            return todos.map(todo => ({
                _id: todo._id,
                title: todo.title,
                done: todo.done,
                owner: {
                  _id: todo.owner._id,
                  name: todo.owner.name,
                  email: todo.owner.email
                }
              }));
        
        },
        getTodoById: async(_, {id}, context, __) => {
            const userId = await getUserId(context)
            const todo = await Todo.findById(new ObjectId(id)).populate('owner')
            if(!todo.owner.equals(new ObjectId(userId))) throw new Error('User has no todo with this id');
            return todo
            
        }
    },
    Mutation: {
        signUp: async (_, args, __) => {
            const user = await new User({
                ...args
            });
            await user.save()
            const token = generateToken(user.id);
            return {
                token,
                user,
            };
        },
        signIn: async(_, {email, password}, __) => {
            const user = await User.findOne({email: email})
            if (!user) {
                throw new Error('Invalid email');
            }
            console.log(user)
            if(user.isCorrectPassword(password)){
                const token = generateToken(user.id)
                return {
                    token,
                    user
                }
            }
        },
        createTodo: async(_, {title} ,context) => {
            const userId = await getUserId(context)
            const user = await User.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }

            const todo = new Todo({
                title,
                owner: user
            });

            await todo.save();
            const populatedTodo = await Todo.findById(todo._id);

            return populatedTodo.toObject();
        },
    }
}

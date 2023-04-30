const mongoose = require('mongoose')
const {Schema} = mongoose


const todoSchema = new Schema({
    title: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Todo', todoSchema)
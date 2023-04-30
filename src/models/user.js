const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
      },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
})
userSchema.pre('save', function(next){
    if (this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 10)
    }
    next()
})

userSchema.methods.isCorrectPassword = function(hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
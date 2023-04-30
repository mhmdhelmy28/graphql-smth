

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "SUPER_SUPER_SECRET"

const generateToken = (userId) => {
        const token = jwt.sign({userId: userId}, SECRET_KEY,{expiresIn: '2h'} )
        return token
}

const getUserId =  context => {
  
    const {authorization} = context.headers;
    if (authorization){
        const token = authorization.split(' ')[1]
       const {userId} = jwt.verify(token, SECRET_KEY)
        return userId
    }
    throw new Error('Not authenticated')
}

const isAuthorized = (context, owner) => {
    const claimedUserId = getUserId(context)
    const actualUser = User.findById(claimedUserId)

    if(!actualUser)
    throw new Error('Invalid user');

  if(!owner)
    throw new Error('Invalid owner');

  if(!(actualUser.id === owner.id))
    throw new Error('Unauthorized request');
}

module.exports = {generateToken, getUserId, isAuthorized}
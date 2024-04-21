const JWT = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET

//  for creating json token 
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    first_name : user.first_name,
    last_name : user.last_name,
    email: user.email,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}
// for validating the token 
function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}
module.exports = {
    createTokenForUser,validateToken
}

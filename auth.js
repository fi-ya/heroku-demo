const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model');

// step 1 for login - get stored user from db using email, use brcypt to compare saved password with user input password and throw errror if wrong or return user object
function verifyUser(email, password) {
  return model
    .getUser(email)
    .then((user) => bcrypt.compare(password, user.password))
    .then((match) => {
      if (!match) {
        throw new Error('Password mismatch');
      } else {
        // make sure we never return the password
        delete user.password;
        return user;
      }
    });
}

function createUser(email, password, name) {
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(email, hash, name));
}

// step 2 for login - creating a random session id for user session and then save sid to db
function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString('base64');
  return model.createSession(sid, { user });
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: 'strict',
  signed: true,
};

module.exports = { verifyUser, createUser, saveUserSession, COOKIE_OPTIONS };

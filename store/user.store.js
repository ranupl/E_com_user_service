const User = require('../model/user.model');

// Save User to Database
const addUser = async (user) => {
  return await User.create(user);
};

// Find User by Email
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// Get All Users
const getUsers = async () => {
  return await User.findAll({ attributes: ['id', 'username', 'email'] }); 
};

module.exports = { addUser, findUserByEmail, getUsers };

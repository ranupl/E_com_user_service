const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, findUserByEmail, getUsers } = require('../store//user.store');

// Business Logic for User Signup
const create = async (userData) => {
  const { username, email, password } = userData;

  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);

  return await addUser({ username, email, password: hashedPassword });
};

// Business Logic for User Login
const authenticate = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const fetchAll = async () => {
  return await getUsers();
};

module.exports = { create, authenticate, fetchAll };

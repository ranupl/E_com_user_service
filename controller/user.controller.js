const { create, authenticate, fetchAll } = require('../service/user.service');

// Signup API
const signUp = async (req, res) => {
  try {
    const user = await create(req.body);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login API
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authenticate(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Get All Users API
const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signUp, login, getAllUsers };

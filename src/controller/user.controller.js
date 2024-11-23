const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET = process.env.SECRETKEY;

const register = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email is already registered
    User.findByEmail(email, async (err, results) => {
        if (err) {
            console.error(err); 
            return res.status(500).json({ message: 'Database error' });
        }

        console.log(results, "checking result--");

        if (results.length > 0) {
            return res.status(200).json({ message: 'Email already registered' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            User.create(username, email, hashedPassword, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Database error' });
                }

                const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(201).json({ 
                    message: 'User registered successfully', 
                    token 
                });
            });
        } catch (error) {
            console.error(error); 
            return res.status(500).json({ message: 'Error hashing password' });
        }
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    User.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

        const user = results[0];
        try {
            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ 
                message: 'Login successful', 
                token 
            });
        } catch (error) {
            res.status(500).json({ message: 'Error comparing passwords' });
        }
    });
};

module.exports = {
    register,
    login,
};

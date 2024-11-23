const db = require('../db/connection');

const User = {
    create: (username, email, hashedPassword, callback) => {
        const sql = 'INSERT INTO users (username, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
        db.query(sql, [username, email, hashedPassword], callback);
    },

    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], callback);
    },
};

module.exports = User;

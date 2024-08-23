const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            password TEXT NOT NULL,
            birthday TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            last_modified TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

const Account = {
    create: (account) => {
        const { first_name, last_name, email, phone, password, birthday } = account;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO accounts (first_name, last_name, email, phone, password, birthday) VALUES (?, ?, ?, ?, ?, ?)`,
                [first_name, last_name, email, phone, password, birthday],
                function (err) {
                    if (err) return reject(err);
                    console.log("sghsgsg",this)
                    resolve(this.lastID); // Resolve with the ID of the inserted row
                }
            );
        });
    },

    findByEmail: promisify((email, callback) => {
        db.get(`SELECT * FROM accounts WHERE email = ?`, [email], callback);
    }),

    findById: promisify((id, callback) => {
        db.get(`SELECT * FROM accounts WHERE id = ?`, [id], callback);
    }),

    update: promisify((id, account, callback) => {
        const { first_name, last_name, email, phone, password, birthday } = account;
        db.run(
            `UPDATE accounts SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ?, birthday = ?, last_modified = CURRENT_TIMESTAMP WHERE id = ?`,
            [first_name, last_name, email, phone, password, birthday, id],
            callback
        );
    }),

    delete: promisify((id, callback) => {
        db.run(`DELETE FROM accounts WHERE id = ?`, [id], callback);
    }),

    list: promisify((limit, callback) => {
        db.all(`SELECT * FROM accounts LIMIT ?`, [limit], callback);
    })
};

module.exports = Account;

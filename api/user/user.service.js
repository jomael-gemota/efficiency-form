const pool = require('../../config/db');

module.exports = {
    createUser: (data, callback) => {
        pool.query(
            `INSERT INTO efficiency_report.users (firstname, lastname, gender, email, password, warehouse_location, role) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.warehouse,
                data.role
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                };

                return callback(null, results);
            }
        );
    },
    getUserByUserEmail: (email, callback) => {
        pool.query(
            `SELECT * FROM efficiency_report.users WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        );
    }
};
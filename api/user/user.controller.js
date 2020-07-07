const { createUser, getUserByUserEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const key = require('ckey');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);

        body.password = hashSync(body.password, salt);
        createUser(body, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: error
                });
            };

            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    },
    getUserByUserEmail: (req, res) => {
        const body = req.body;

        getUserByUserEmail(body.email, (error, results) => {
            if (error) {
                return res.json({
                    success: 0,
                    message: error
                });
            };

            if (!results) {
                return res.json({
                    success: 0,
                    message: "Incorrect Email Address"
                });
            };

            const result = compareSync(body.password, results.password);
            
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, key.JSTOKEN_SECRET_KEY, {
                    expiresIn: "1h"
                });

                return res.json({
                    success: 1,
                    id: results.id,
                    message: "Login Successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Incorrect Password"
                });
            };
        });
    }
};
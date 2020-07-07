const { insertFormResponse } = require('./form.service');

module.exports = {
    insertFormResponse: (req, res) => {
        const body = req.body;

        insertFormResponse(body, (error, results) => {
            if (error) {
                return res.json({
                    success: 0,
                    message: error
                });
            };

            return res.json({
                success: 1,
                message: results
            });
        });
    }
};
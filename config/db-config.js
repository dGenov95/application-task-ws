const mongoose = require('mongoose');

module.exports = function initDb(dbUrl) {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

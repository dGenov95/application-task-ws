const applicationsRoute = require('../routes/application');

module.exports = (app) => {
    app.use('/applications', applicationsRoute);
};
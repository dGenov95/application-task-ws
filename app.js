//Node modules
const express = require('express');

//Project modules
const envConfig = require('./config/env-config');
const initDb = require('./config/db-config');
const initMiddleware = require('./config/middleware-config');
const initRoutes = require('./config/routes-config');

const app = express();

const env = process.env.NODE_ENV || 'development';

const envOpts = envConfig[env];

initMiddleware(app, envOpts.rootPath);
initRoutes(app);
initDb(envOpts.dbUrl)
    .then(() => {
        console.log('Successfull db connection');
        app.listen(envOpts.port, (console.log(`App listnening on port ${envOpts.port}`)));

    })
    .catch(e => console.log('Error when connecting to db'));
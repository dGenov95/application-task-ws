const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

module.exports = (app, rootPath) => {
    app.use(logger('dev'));
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // app.use((req, res, next) => {
    //     next(createError(404));
    // });

    app.use(express.static(path.join(rootPath, 'public')));

    // app.use((err, req, res, next) => {
    //     res.locals.message = err.message;
    //     res.locals.error = req.app.get('env') === 'development' ? err : {};

    //     res.status(err.status || 500);
    //     res.render('error');
    // });
};

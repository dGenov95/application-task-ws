const express = require('express');
const router = express.Router();

const Application = require('../data/models/application-model');

router
    .get('/', (req, res) => {
        Application.find()
            .then(a => res.json(a))
            .catch(e => console.log(e));
    })
    .post('/', (req, res) => {
        const requestBody = req.body
        const newApplication = Object.assign({}, requestBody, {
            name: requestBody.name,
            email: requestBody.email,
            phone: requestBody.phone,
            loanAmount: Number(requestBody.loanAmount)
        });
        Application.create(newApplication)
            .then(() => res.redirect('/applications'))
            .catch(e => console.log(e));
    })
    .get('/:id', (req, res) => {
        Application.findById(req.params.id)
            .then(a => res.json(a))
            .catch(e => console.log(e));
    })
    .put('/:id', (req, res) => {

    })
    .delete("/:id", (req, res) => {

    });

module.exports = router;
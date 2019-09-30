const express = require('express');
const router = express.Router();

const Application = require('../data/models/application-model');

router
    .get('/', (req, res) => {
        Application.find()
            .then(a => res.json(a))
            .catch(e => console.log(e));
    })
    .post('/', (req, res, next) => {
        const requestBody = req.body;
    
        getCurrentSmallestLoanAmount()
            .then(smallestLoanAmount => {
                if (smallestLoanAmount > requestBody.loanAmount) {
                    res.status(500).send({ error: `Invalid loan amount - must be greater than ${smallestLoanAmount}` });
                   
                } else {
                    doCreateApplication(requestBody)
                        .then(() => {
                            console.log('Successfully created application')
                            res.end();
                        })
                        .catch(e => console.log(e));
                }
            })
            .catch(err => console.log(err));
    })
    .get('/:id', (req, res) => {
        Application.findById(req.params.id)
            .then(a => res.json(a))
            .catch(e => console.log(e));
    })
    .put('/:id', (req, res) => {
        //TODO - to implement if requested
    })
    .delete("/:id", (req, res) => {
        Application.deleteOne({ _id: req.params.id })
            .then(() => {
                console.log('Successfully deleted application')
                res.end();
            })
            .catch(err => console.log(err));
    });

 async function getCurrentSmallestLoanAmount(){
    try {
        const apps = await Application.find();        
        if (apps.length === 0) {
          return 0;
        } 

        const smallestLoanAmount = apps.map(app => app.loanAmount).reduce((prev, curr) => prev < curr ? prev : curr);        

        return smallestLoanAmount; 
    } catch (err) {
        console.log(err);
    }
}

const doCreateApplication = (requestBody) => {
    const newApplication = Object.assign({}, requestBody, {
        name: requestBody.name,
        email: requestBody.email,
        phone: requestBody.phone,
        loanAmount: Number(requestBody.loanAmount)
    });
    return Application.create(newApplication)
}

module.exports = router;




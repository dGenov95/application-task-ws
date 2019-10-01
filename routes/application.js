const express = require('express');
const router = express.Router();

const Application = require('../data/models/application-model');

router
    .get('/', (req, res) => {
        Application.find()
            .then(a => res.json(a))
            .catch(e => console.log(e));
    })
    .post('/',(req, res, next) => {
        const requestBody = req.body;
       
        getCurrentSmallestLoanAmount()
            .then(smallestLoanAmount => {

                if (smallestLoanAmount > Number.parseInt(requestBody.loanAmount)) {
                    const invalidLoanError = new Error(`Invalid loan amount - must be greater than ${smallestLoanAmount}`);
                    invalidLoanError.status = 400
                    next(invalidLoanError);                   
                } else {
                    doCreateApplication(requestBody, smallestLoanAmount)
                        .then(() => {
                            console.log('Successfully created application')
                            res.end();
                        })
                        .catch(e => {
                            console.log(e);
                            next(e);
                        });
                }
            })
            .catch(err => console.log(err));
    })
    .get('/:id', (req, res, next) => {
        Application.findById(req.params.id)
            .then(a => {
                if (!a) {
                    const applicationNotFoundError = new Error(`Application with id ${req.params.id} not found`);
                    applicationNotFoundError.status = 404
                    next(applicationNotFoundError);
                    return;
                }
                res.json(a)
            })
            .catch(e => {
                console.log(e);
                next(e);
            });
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

const doCreateApplication = (requestBody, smallestLoanAmount) => {
    const interestRate = calculateInterestRate(requestBody.loanAmount, smallestLoanAmount);
    const newApplication = Object.assign({}, requestBody, {
        name: requestBody.name,
        email: requestBody.email,
        phone: requestBody.phone,
        loanAmount: Number(requestBody.loanAmount),
        interestRate: interestRate,
    });
    return Application.create(newApplication)
}

const calculateInterestRate = (loanAmount, smallestLoanAmount) =>{
    let interestRate = 0.0;
    
    if (isPrime(loanAmount)) {
        console.log(`the loan (${loanAmount}) is a prime number so automatically calculating an interest rate of 9.99% `);
        interestRate += 0.0999;
    }

    if (loanAmount > smallestLoanAmount) {
        const randomInterestRate = getRandomInterestBetween(2, 14);
        console.log(`the loan is greater than the current smallest, so interest rate is randomly generated: ${randomInterestRate}`);
        interestRate += randomInterestRate;
    }
    
    return interestRate;
}

const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}

const getRandomInterestBetween = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = router;




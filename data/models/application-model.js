const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const applicationSchema = new Schema({
    name: { type: String, required:true },
    email: { type: String, required:true },
    phone: { type: String, required:true },
    loanAmount: { type: Number, required: true },
});

module.exports = model('Application', applicationSchema);
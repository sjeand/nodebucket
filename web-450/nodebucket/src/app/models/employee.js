/*
=======================================================
  Title: Nodebucket
  Author: Professor Krasso
  Date: 11/03/2021
  Modified by: Sarah Jean Baptiste
  Description: Employee.js
========================================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Employee Schema
let employeeSchema = new Schema({
  empId: { type: String, unique: true, dropDups: true },
  firstName: { type: String },
  lastName: { type: String },
}, { collection: 'employees'})

console.log('is this working?');

module.exports = mongoose.model('Employee', employeeSchema);

console.log('what about this?');

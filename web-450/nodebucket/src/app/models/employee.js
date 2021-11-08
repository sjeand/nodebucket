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
const ItemDocument = require('./item');

// Employee Schema
let employeeSchema = new Schema({
  empId: { type: String, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  todo: [ ItemDocument ],
  done: [ ItemDocument ],
}, { collection: 'employees'})

module.exports = mongoose.model('Employee', employeeSchema);


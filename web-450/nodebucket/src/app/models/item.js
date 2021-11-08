/*
=======================================================
  Title: Nodebucket
  Author: Professor Krasso
  Date: 11/04/2021
  Modified by: Sarah Jean Baptiste
  Description: Item.js
========================================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Item Schema
let itemSchema = new Schema({
  text: {type: String}
})

module.exports = itemSchema;

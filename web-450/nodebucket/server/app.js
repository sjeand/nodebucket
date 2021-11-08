/*
=======================================================
  Title: Nodebucket
  Author: Professor Krasso
  Date: 11/03/2021
  Modified by: Sarah Jean Baptiste
  Description: App.js
========================================================
*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('../src/app/models/employee');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = process.env.PORT || 3000; // server port

// Personal connection string
const conn = 'mongodb+srv://admin:5975@buwebdev-cluster-1.levpe.mongodb.net/nodebucket?authSource=admin&replicaSet=atlas-sc0j04-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * APIs
 */

//findOne
app.get('/api/employees/:empId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error!' + err.message
        })
      }
      else {
        console.log(employee);
        res.json(employee);
      }
    })
  }
  catch (e) {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error!' + e.message
    })
  }
})

// findAllTasks
app.get('/api/employees/:empId/tasks', async(req, res) =>{
  try {
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee)
    {
      if (err)
      {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error!' + err.message
        })
      }
      else {
        console.log(employee);
        res.json(employee);
      }
    })
  }
  catch (e)
  {
    console.log(e);
    res.status(500).send('Internal server error:' + e.message);
    }
})

// CreateTask
app.post('/api/employees/:empId/tasks', async(req, res) => {
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err)
      {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error:' + err.message
        })
      }
      else
      {
        console.log(employee);

        const newItem = {
          text: req.body.text
        }
        employee.todo.push(newItem);

        employee.save(function(err, updatedEmployee) {
          if(err)
          {
            console.log(err);
            res.status(500).send({
              'message': 'Internal server error' + err.message
            })
          }
          else
          {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        })
      }
    })
  }
  catch(e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error' + e.message
    })
  }
})

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function

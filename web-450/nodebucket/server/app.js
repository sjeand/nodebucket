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
    Employee.findOne({'empId': req.params.empId}, 'empId todo done firstname', function(err, employee)
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

// updateTask
app.put('/api/employees/:empId/tasks', async(req, res) => {
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err)
      {
        console.log(err);

        const updatedTaskMongoErrorResponse = new BaseResponse('501', `MongoDB server error`, err);

        res.status(501).send(updatedTaskMongoErrorResponse.toObject());
      }
      else
      {
        console.log(employee);

        employee.set({
          todo: req.body.todo,
          done: req.body.done
        });

        employee.save(function(err, updatedEmployee) {
          if(err)
          {
            console.log(err);

            const updatedTaskMongoErrorResponse = new BaseResponse('500', 'MongoDB server error', err);

            res.status(500).send(updatedTaskMongoErrorResponse.toObject());
          }
          else
          {
            console.log(updatedEmployee);

            const updatedTaskOnSuccessResponse = new BaseResponse('200', 'update successful', updatedEmployee);

            res.json(updatedTaskOnSuccessResponse.toObject());
          }
        })
      }
    })
  }
  catch(e)
  {
    console.log(e);

    const updateTaskCatchErrorResponse = new BaseResponse('500', 'internal server error', e);

    res.status(500).send(updateTaskCatchErrorResponse.toObject());
  }
})

// deleteTask
app.delete('/api/employees/:empId/tasks/:taskId', async(req, res) => {
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err)
      {
        console.log(err);

        const deleteTaskMongoErrorResponse = new BaseResponse('501', 'MongoDB server error', err);

        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      }
      else
      {
        console.log(employee);

        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

          if(todoItem) {
            employee.todo.id(todoItem._id).remove();
            employee.save(function(err, updatedTodoItemEmployee){
              if (err){
                console.log(err);

                const deleteTodoItemMongoErrorResponse = new BaseResponse('501', 'MongoDB server error', err);

                res.status(501).send(deleteTodoItemMongoErrorResponse.toObject());
              }
              else {
                console.log(updatedTodoItemEmployee);

                const deleteTodoItemOnSuccessResponse = new BaseResponse('200', 'removed item from to do list');

                res.json(deleteTodoItemOnSuccessResponse.toObject());
              }
            })
          } else if (doneItem) {
            employee.done.id(doneItem._id).remove();

            employee.save(function(err, updatedDoneItemEmployee) {
              if (err) {
                console.log(err);

                const deleteDoneItemMongoErrorResponse = new BaseResponse('501', 'MongoDB server error', err);

                res.status(501).send(deleteTodoItemMongoErrorResponse.toObject());

              } else {
                console.log(updatedDoneItemEmployee);

                const deleteDoneItemOnSuccessResponse = new BaseResponse('200', 'removed item from done list', updatedDoneItemEmployee);

                res.json(deleteDoneItemOnSuccessResponse.toObject());
              }
            })
          } else {
            console.log('invalid task id:' + req.params.taskId);

            const deleteTaskNotFoundResponse =  new BaseResponse('300', 'invalid taskId', req.params.taskId);

            res.status(300).send(deleteTaskNotFoundResponse.toObject());
          }
        }

      })
    }
    catch(e)
    {
      console.log(e);

      const deleteTaskCatchErrorResponse = new BaseResponse('500', 'internal server error', e);

      res.status(500).send(deleteTaskCatchErrorResponse.toObject());
    }
  })



/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function

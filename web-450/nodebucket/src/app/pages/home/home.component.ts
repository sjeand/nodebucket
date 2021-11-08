/*
=======================================================
  Title: Nodebucket
  Author: Professor Krasso
  Date: 11/03/2021
  Modified by: Sarah Jean Baptiste
  Description: Home Component
========================================================
*/

// Import statements
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from 'src/app/task.service';
import { Item } from '../../shared/models/item.interface';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { Employee } from '../../shared/models/employee.interface';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: any;
  firstName: any;



  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);


    // Find all tasks based of employee id
    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('--server response from FindAllTasks--');
      console.log(res);

      this.employee = res;
      console.log('--employee object--');
      console.log(this.employee);
    }, err => {
      console.log('--server error--');
      console.log(err);
    }, () => {
      console.log('inside the complete function of the findAllTasks API');

      // Show to do and done tasks in designated column 
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('--ToDo tasks--');
      console.log(this.todo);

      console.log('--Done tasks--');
      console.log(this.done);

    })
   }



  ngOnInit(): void {}

  //Task dialog to open when user hits button
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    // Close dialog after user adds to list or hits cancel
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res;
        }, err => {
          console.log('--server error--');
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        }
        )
      }
    })
  }

}

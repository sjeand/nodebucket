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
import { CdkDrag, CdkDragDrop, DropListRef, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;


  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog, private http: HttpClient) {
    const empId = parseInt(this.cookieService.get('session_user'), 10);

    // Find all tasks based of employee id
    this.taskService.findAllTasks(empId).subscribe(res => {
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
        this.taskService.createTask(this.employee.empId, data.text).subscribe(res => {
          this.employee = res;
        }, err => {
          console.log('--server error--');
          console.log(err);
        }, () => {
          //this.todo = this.employee.todo;
          //this.done = this.employee.done;
        }
        )
      }

    })

  }

  drop(event: CdkDragDrop<any[]>) {

    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log(`Reordered the existing list of task items`);
      this.updateTaskList(this.empId, this.todo, this.done);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      console.log(`Moved task item to the container`);
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  updateTaskList(empId: number, todo: Item[], done: Item[]): void {
    const body = {todo: this.todo, done: this.done}
    this.taskService.updateTask(empId, todo, done).subscribe(res =>
      {
        this.employee = res.data;
      }, err => {
        console.log(err);
      }, () => {
          this.todo = this.employee.todo
          this.done = this.employee.done
        })
    }

  deleteTask(taskId: string) {

    if (confirm('Are you sure you want to delete this task?')) {
      if (taskId) {
        console.log(`Task item: ${taskId} was deleted`);
        this.taskService.deleteTask(this.empId, taskId).subscribe(res =>
        {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
            this.todo = this.employee.todo
            this.done = this.employee.done
          })

      }
    }
  }
}



function deleteTask() {
  throw new Error('Function not implemented.');
}

function taskId(taskId: any, string: any) {
  throw new Error('Function not implemented.');
} 

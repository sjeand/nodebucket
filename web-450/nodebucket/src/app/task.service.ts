/*
=======================================================
  Title: Nodebucket
  Author: Professor Krasso
  Date: 11/03/2021
  Modified by: Sarah Jean Baptiste
  Description: App Routing
========================================================
*/

// Import statements
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './shared/models/employee.interface';
import { Item } from './shared/models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // find all tasks by employee id
  findAllTasks(empId: number): Observable<Employee> {
   return this.http.get('/api/employees/' + empId + '/tasks') as Observable<Employee>;
  }

  /**
   *
   * @param empId
   * @param task
   * @returns
   */

  // find employee and  add new task
  createTask(empId: string, task: string): Observable<Employee> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    })  as Observable<Employee>;
  }

  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }

  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}



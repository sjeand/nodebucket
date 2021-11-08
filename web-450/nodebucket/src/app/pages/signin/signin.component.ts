/*
=======================================================
  Title: Nodebucket
  Author: Professor Krasso
  Date: 11/03/2021
  Modified by: Sarah Jean Baptiste
  Description: sign in component
========================================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signin',
  templateUrl: '/signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService,
    private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  // login function to reroute user or show error message
  login(): void {
    const empId = this.form.controls['empId'].value;

    this.http.get('/api/employees/' + empId).subscribe(res =>
    {
      if (res)
      {
        console.log(res);

        // Add first and last name to session storage
        sessionStorage.setItem('name', `${res['firstName']} ${res['lastName']}`);

        this.cookieService.set('session_user', empId, 1); // Get employee ID

        this.router.navigate(['/']);
      }
      else
      {
        this.error = 'The employee ID you entered is not valid, please try again.' // error to display when user enters invalid ID
      }
    })
  }
}

/*
=======================================================
  Title: Nodebucket
  Author: Professor Krasso
  Date: 11/03/2021
  Modified by: Sarah Jean Baptiste
  Description: baselayout
========================================================
*/

// Import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: Boolean;
  name: String;

  // Show what user is signed in
  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true:false;
    console.log('isLoggedIn' + this.isLoggedIn);
   }

  ngOnInit(): void {
    console.log('inside the ngOnInit of the base-layout.component.html file');
    this.name = sessionStorage.getItem('name');
    console.log('Logged in user name' + this.name); // displayed in drop down of navbar profile icon
  }

  signOut(){
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']); // return user to sign in page after successful log out
  }
}

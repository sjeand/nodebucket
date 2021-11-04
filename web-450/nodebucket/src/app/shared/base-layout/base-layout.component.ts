/*
=======================================================
  Title: Nodebucket
  Author: Professor Krasso
  Date: 11/03/2021
  Modified by: Sarah Jean Baptiste
  Description: baselayout
========================================================
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}

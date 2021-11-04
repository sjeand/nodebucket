/*
=======================================================
  Title: Nodebucket
  Author: Professor Krasso
  Date: 11/03/2021
  Modified by: Sarah Jean Baptiste
  Description: Authguard
========================================================
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {

  }

  // Require proper sign in to navigate off sign in page or user remains on sign in page with invalid login
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const sessionUser = this.cookieService.get('session_user');

      if (sessionUser) {
        return true;
      } else {

        this.router.navigate(['/session/signin']);

        return false;
      }
  }

}

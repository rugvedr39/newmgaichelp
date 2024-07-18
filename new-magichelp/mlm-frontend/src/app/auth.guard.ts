// auth.guard.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
      return false;
    }
  }

  private isAuthenticated(): boolean {
    // Check if essential user information is present in local storage
    return !!localStorage.getItem('token') && !!localStorage.getItem('email')
           && !!localStorage.getItem('username') && !!localStorage.getItem('_id');
  }
}

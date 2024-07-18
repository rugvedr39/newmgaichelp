import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private http: HttpClient,private router: Router) {}
  name:any = localStorage.getItem('name');

logout() {
  localStorage.clear
  this.router.navigate(['/login']);
}

}

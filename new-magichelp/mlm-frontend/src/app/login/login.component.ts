import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient,private router: Router) {}

  loginUser(): void {
    this.http.post<any>(`${environment.apiUrl}/auth/login`, this.formData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email);
          localStorage.setItem('username', response.username);
          localStorage.setItem('name', response.username);
          localStorage.setItem('_id', response._id);
          this.router.navigate(['/dashboard']);
        },
        error => {
          alert(error.message);
          console.error('Login error:', error);
        }
      );
  }

}

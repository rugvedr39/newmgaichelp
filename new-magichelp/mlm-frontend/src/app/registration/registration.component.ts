import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  formData = {
    username: '',
    email: '',
    password: '',
    mobileNumber: '',
    sponsorUsername: '',
    ePinId: '',
    upiNumber: '',
    bankDetails: {
      accountNumber: '',
      ifscCode: ''
    },

  };
  constructor(private http: HttpClient,private router: Router) {}

  registerUser(): void {
    this.http.post<any>(`${environment.apiUrl}/auth/signup`, this.formData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email);
          localStorage.setItem('username', response.username);
          localStorage.setItem('_id', response._id);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Registration error:', error);
        }
      );
  }

}

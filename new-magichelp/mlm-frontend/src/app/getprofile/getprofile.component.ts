// getprofile.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-getprofile',
  templateUrl: './getprofile.component.html',
  styleUrls: ['./getprofile.component.css']
})
export class GetprofileComponent implements OnInit {

  profileData: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any>(`${environment.apiUrl}/auth/profile`, { headers }).subscribe(
      response => {
        this.profileData = response;
        console.log('Profile Data:', this.profileData);
      },
      error => {
        console.error('Error fetching profile:', error);
      }
    );
  }

}

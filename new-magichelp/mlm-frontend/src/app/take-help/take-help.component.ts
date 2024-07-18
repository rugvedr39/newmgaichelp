import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface LevelSummary {
  totalPeople: number;
  paidPeople: number;
  openPeople: number;
  level?: number;
  levelStatus: string;
}

interface MatrixSummary {
  [key: string]: LevelSummary;
}

@Component({
  selector: 'app-take-help',
  templateUrl: './take-help.component.html',
  styleUrls: ['./take-help.component.css']
})
export class TakeHelpComponent implements OnInit {
  levels: LevelSummary[] = [];
  selectedLevelData: LevelSummary | null = null;

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.fetchMatrixSummary();
  }

  fetchMatrixSummary(): void {
    const payerId = localStorage.getItem('_id');
    if (!payerId) {
      console.error('PayerId not found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<MatrixSummary>(`${environment.apiUrl}/payments/getMatrixSummary/${payerId}`, { headers })
      .subscribe(
        response => {
          this.levels = Object.entries(response).map(([key, value]) => ({
            ...value,
            level: parseInt(key.replace('level', ''))
          }));
        },
        error => {
          console.error('Error fetching matrix summary:', error);
        }
      );
  }

  selectLevel(level: LevelSummary): void {
    this.router.navigate(['/level-details', level.level], { state: { levelData: level } });
  }

  getProgressWidth(level: LevelSummary): string {
    if (level.totalPeople === 0) return '0%';
    const percentage = (level.paidPeople / level.totalPeople) * 100;
    return `${percentage}%`;
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'locked':
        return '#e74c3c';
      case 'unlocked':
        return '#2ecc71';
      default:
        return '#3498db';
    }
  }
}
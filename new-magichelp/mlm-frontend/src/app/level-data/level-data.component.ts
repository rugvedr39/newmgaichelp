import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-level-data',
  templateUrl: './level-data.component.html',
  styleUrls: ['./level-data.component.css']
})
export class LevelDataComponent implements OnInit {
  levelData: any;
  levelDetails: any[]=[];
  currentPage = 1;
  itemsPerPage = 10; // Adjust as needed
  loading = false;
  endOfData = false;



  constructor(private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit(): void {
    this.levelData = history.state.levelData;
    if (this.levelData) {
      this.fetchLevelDetails(this.levelData.level);
    }
  }


  fetchLevelDetails(level: number): void {

    if (this.loading || this.endOfData) {
      return;
    }

    this.loading = true;

    
    const payerId = localStorage.getItem('_id');
    if (!payerId) {
      console.error('PayerId not found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const params = {
      page: this.currentPage.toString(),
      limit: this.itemsPerPage.toString()
    };

    this.http.get<any[]>(`${environment.apiUrl}/payments/transactions/sender/${payerId}/${level}`, { headers, params })
      .subscribe(
        response => {
          if (response.length > 0) {
            this.levelDetails = [...this.levelDetails, ...response].sort((a, b) => a.status === 'pending' ? -1 : 1);
            this.currentPage++;
          } else {
            this.endOfData = true;
          }
          this.loading = false;
        },
        error => {
          console.error('Error fetching matrix summary:', error);
          this.loading = false;
        }
      );
  }


confirmPayment(transactionId: string): void {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  this.http.put(`${environment.apiUrl}/payments/transactions/done/${transactionId}`, {}, { headers })
    .subscribe(
      response => {
        console.log('Payment confirmed:', response);
        this.levelDetails = this.levelDetails.map(transaction => 
          transaction._id === transactionId ? { ...transaction, status: 'paid' } : transaction
        );
      },
      error => {
        console.error('Error confirming payment:', error);
      }
    );
}


@HostListener('window:scroll', ['$event'])
onScroll(event:any): void {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    this.fetchLevelDetails(this.levelData.level);
  }
}

}


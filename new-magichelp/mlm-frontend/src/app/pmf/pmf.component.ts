import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, HostListener, ViewChild, ElementRef  } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-pmf',
  templateUrl: './pmf.component.html',
  styleUrls: ['./pmf.component.css']
})
export class PmfComponent implements OnInit {
  levelData: any;
  levelDetails: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  loading = false;
  endOfData = false;
  epin: any;

@ViewChild('paymentModal') paymentModal!: ElementRef;
  transactionId: string='';


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.levelData = history.state.levelData;
    this.fetchLevelDetails();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.loading && !this.endOfData) {
      this.currentPage++;
      this.fetchLevelDetails();
    }
  }

  fetchLevelDetails(): void {
    if (this.loading) {
      return;
    }

    const payerId = localStorage.getItem('_id');
    if (!payerId) {
      console.error('PayerId not found in localStorage');
      return;
    }

    this.loading = true;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any>(`${environment.apiUrl}/payments/getTransactionsPMF/${payerId}?page=${this.currentPage}&limit=${this.itemsPerPage}`, { headers })
      .subscribe(
        response => {
          this.levelDetails = [...this.levelDetails, ...response.transactions];
          if (response.currentPage >= response.totalPages) {
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

  openModal(transactionId: string): void {
    this.transactionId = transactionId;
  }



  confirmPayment(): void {
    if (this.transactionId!='') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
    
      this.http.put(`${environment.apiUrl}/payments/transactions/payPMF/${this.transactionId}/${this.epin}`, {}, { headers })
        .subscribe(
          (response:any) => {
            alert(response.message)
            this.levelDetails = this.levelDetails.map(transaction =>
              transaction._id === this.transactionId ? { ...transaction, status: 'paid' } : transaction
            );
          },
          error => {
            console.error('Error confirming payment:', error);
          }
        );
    }
  }
}

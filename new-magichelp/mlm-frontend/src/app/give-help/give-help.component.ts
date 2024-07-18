import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-give-help',
  templateUrl: './give-help.component.html',
  styleUrls: ['./give-help.component.css']
})
export class GiveHelpComponent implements OnInit {

  transactions: any[] = [];
  currentTransactionId: string | null = null;
  utrNumber: string = '';
  selectedTransaction: any;




  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    const payerId = localStorage.getItem('_id');
    if (!payerId) {
      console.error('PayerId not found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });


    this.http.get<any[]>(`${environment.apiUrl}/payments/transactions/payer/${payerId}`, { headers })
      .subscribe(
        response => {
          this.transactions = response;
        },
        error => {
          console.error('Error fetching transactions:', error);
        }
      );
  }

  openModal(transactionId: string,amount:number,username:string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    this.http.post<any[]>(`${environment.apiUrl}/payments/transactions/wanttopay`, { username:username,amount:amount},{headers}).subscribe((response:any) =>{
      if (response.status === 201) {
        this.currentTransactionId = transactionId;
      }else{
        alert(response.message)
      }
    })
  }

  closeModal(): void {
    this.currentTransactionId = null;
  }

  isPaid(status: string): boolean {
    return status === 'paid';
  }


  submitUtrNumber(): void {
    if (this.currentTransactionId) {
      const transactionId = this.currentTransactionId;
      const token = localStorage.getItem('token');
      const payload = {
        utrNumber: this.utrNumber,
        status: 'pending'
      };

      this.http.put(`${environment.apiUrl}/payments/transactions/${transactionId}`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).subscribe(
        response => {
          console.log('Transaction updated successfully:', response);
          this.fetchTransactions();
        },
        error => {
          console.error('Error updating transaction:', error);
        }
      );
    }
  }

}

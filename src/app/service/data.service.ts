import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../interface/customer';
import { Tarnsaction } from '../interface/tarnsaction';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = "http://localhost:3000"

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  }

  getTransactions(): Observable<Tarnsaction[]> {
    return this.http.get<Tarnsaction[]>(`${this.apiUrl}/transactions`);
  }

  getTransactionsByCustomerId(customerId: number): Observable<Tarnsaction[]> {
    return this.http.get<Tarnsaction[]>(`${this.apiUrl}/transactions?customer_id=${customerId}`);
  }
}

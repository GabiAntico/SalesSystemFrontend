import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sales} from '../components/models/salesModel';
import {ClientModel} from '../components/models/clientModel';
import {SellerModel} from '../components/models/sellerModel';
import {SaleRequestModel} from '../components/models/SaleRequestModel';
import {SaleComplete} from '../components/models/SaleCompleteModel';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/api';


  getAllClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${this.apiUrl}/clients`);
  }

  getAllSellers(): Observable<SellerModel[]> {
    return this.http.get<SellerModel[]>(`${this.apiUrl}/sellers`);
  }

  postSale(sale: SaleRequestModel): Observable<Sales> {
    return this.http.post<Sales>(`${this.apiUrl}/sales`, sale);
  }

  getSalesByClient(name: string): Observable<Sales[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Sales[]>(`${this.apiUrl}/sales`, {params});
  }

  getSaleCompleteById(id: number): Observable<SaleComplete> {
    return this.http.get<SaleComplete>(`${this.apiUrl}/sales/${id}`);
  }
}

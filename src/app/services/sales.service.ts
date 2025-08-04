import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sales} from '../models/salesModel';
import {ClientModel} from '../models/clientModel';
import {SellerModel} from '../models/sellerModel';
import {SaleRequestModel} from '../models/SaleRequestModel';

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
}

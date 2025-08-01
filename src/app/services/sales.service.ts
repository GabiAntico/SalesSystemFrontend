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
  constructor(private http: HttpClient) {

  }

  getAllSales(): Observable<Sales[]> {
    return this.http.get<Sales[]>('http://localhost:8080/api/sales');
  }

  getAllProducts(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/products');
  }

  getAllClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>('http://localhost:8080/api/clients');
  }

  getAllSellers(): Observable<SellerModel[]> {
    return this.http.get<SellerModel[]>('http://localhost:8080/api/sellers');
  }

  postSale(sale: SaleRequestModel): Observable<Sales> {
    return this.http.post<Sales>('http://localhost:8080/api/sales', sale);
  }

  getSalesByClient(name: string): Observable<Sales[]> {
    // if(name === ""){
    //   return this.getAllSales();
    // }


    const params = new HttpParams().set('name', name);
    return this.http.get<Sales[]>('http://localhost:8080/api/sales', {params});
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SellerModel} from '../models/sellerModel';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  private apiUrl = 'http://localhost:8080/api/sellers';

  constructor(private http: HttpClient) { }

  saveSeller(seller: any): Observable<SellerModel> {
    return this.http.post<SellerModel>(this.apiUrl, seller);
  }

}

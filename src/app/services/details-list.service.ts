import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SellerModel} from '../models/sellerModel';
import {SaleDetailRequestModel} from '../models/saleDetailRequestModel';

@Injectable({
  providedIn: 'root'
})
export class DetailsListService {

  private details = new BehaviorSubject<SaleDetailRequestModel[] | null>(null);


  setDetails(details: SaleDetailRequestModel[]) {
    this.details.next(details);
  }

  getDetails(): Observable<SaleDetailRequestModel[] | null> {
    return this.details.asObservable();
  }

  clear(){
    this.details.next(null);
  }
}

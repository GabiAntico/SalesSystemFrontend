import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SellerModel} from '../components/models/sellerModel';
import {SaleDetailRequestModel} from '../components/models/saleDetailRequestModel';
import {SaleDetailModelTransfer} from '../components/models/saleDetailModelTransfer';

@Injectable({
  providedIn: 'root'
})
export class DetailsListService {

  private details = new BehaviorSubject<SaleDetailModelTransfer[] | null>(null);


  setDetails(details: SaleDetailModelTransfer[]) {
    this.details.next(details);
  }

  getDetails(): Observable<SaleDetailModelTransfer[] | null> {
    return this.details.asObservable();
  }

  clear(){
    this.details.next(null);
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SellerModel} from '../models/sellerModel';

@Injectable({
  providedIn: 'root'
})
export class SelectedSellerService {

  private selectedSeller = new BehaviorSubject<SellerModel | null>(null);


  setSeller(selectedSeller: SellerModel) {
    this.selectedSeller.next(selectedSeller);
  }

  getSeller(): Observable<SellerModel | null> {
    return this.selectedSeller.asObservable();
  }

  clear(){
    this.selectedSeller.next(null);
  }

}

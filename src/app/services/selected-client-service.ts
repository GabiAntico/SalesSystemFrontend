import { Injectable } from '@angular/core';
import {ClientModel} from '../models/clientModel';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedClientService {

  private selectedClient = new BehaviorSubject<ClientModel | null>(null);


  setClient(selectedClient: ClientModel) {
    this.selectedClient.next(selectedClient);
  }

  getClient(): Observable<ClientModel | null> {
    return this.selectedClient.asObservable();
  }

  clear(){
    this.selectedClient.next(null);
  }
}

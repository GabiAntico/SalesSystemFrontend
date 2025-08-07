import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClientModel} from '../components/models/clientModel';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl = 'https://salessystembackend.onrender.com/api/clients';

  constructor(private http: HttpClient) { }


  saveClient(client: any): Observable<ClientModel> {
    return this.http.post<ClientModel>(this.apiUrl, client);
  }
}

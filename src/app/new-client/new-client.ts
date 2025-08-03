import { Component } from '@angular/core';
import {ClientsService} from '../services/clients.service';
import {ClientModel} from '../models/clientModel';
import Swal from 'sweetalert2';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {SelectedClientService} from '../services/selected-client-service';

@Component({
  selector: 'app-new-client',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './new-client.html',
  styleUrl: './new-client.css'
})
export class NewClient {

  clientName: string = "";
  createdClient: ClientModel | null = null;

  constructor(private clientsService: ClientsService, private selectedClientService: SelectedClientService, private router: Router) { }

  saveClient(){
    if(this.clientName === "" || !this.clientName){
      Swal.fire({
        title: "Client name is required",
        text: "You can't save the client without introduce the name",
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const newClient = {
      name: this.clientName
    }

    this.clientsService.saveClient(newClient).subscribe({
      next: data => {
        this.createdClient = data

        if(this.createdClient){
          Swal.fire({
            title: 'Client saved',
            text: "Your client has been saved successfully!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          });

          this.selectedClientService.setClient(this.createdClient);
          this.router.navigate(['/sell']);
        }
        else{
          Swal.fire({
            title: 'Error saving Client',
            text: "Your client could not be created!",
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          });
        }
      },
      error: err => {
        console.log('There was a problem creating Client');
        console.log(err)

        Swal.fire({
          title: 'Error saving Client',
          text: "Your client could not be created!",
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}

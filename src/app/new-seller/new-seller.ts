import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import Swal from 'sweetalert2';
import {ClientModel} from '../models/clientModel';
import {SellerModel} from '../models/sellerModel';
import {SellersService} from '../services/sellers.service';
import {Router, RouterLink} from '@angular/router';
import {SelectedSellerService} from '../services/selected-seller-service';

@Component({
  selector: 'app-new-seller',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './new-seller.html',
  styleUrl: './new-seller.css'
})
export class NewSeller {

  sellerName: string = "";
  createdSeller: SellerModel | null = null;

  constructor(private sellerService: SellersService, private selectedSellerService: SelectedSellerService, private router: Router) { }

  saveSeller(){
    console.log("This is the name written: " + this.sellerName)
    if(this.sellerName === "" || !this.sellerName){
      alert("Client name is required");
      return;
    }

    const newSeller = {
      name: this.sellerName
    }

    this.sellerService.saveSeller(newSeller).subscribe({
      next: data => {
        this.createdSeller = data

        if(this.createdSeller){
          Swal.fire({
            title: 'Seller saved',
            text: "Your seller has been saved successfully!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          });

          this.selectedSellerService.setSeller(this.createdSeller);
          this.router.navigate(['/sell']);
        }
        else{
          Swal.fire({
            title: 'Error saving Seller',
            text: "Your seller could not be created!",
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          });
        }
      },
      error: err => {
        console.log('There was a problem creating Seller');
        console.log(err)

        Swal.fire({
          title: 'Error saving Seller',
          text: "Your seller could not be created!",
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}

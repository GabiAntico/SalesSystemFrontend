import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SalesService} from '../services/sales.service';
import {Sales} from '../models/salesModel'
import {Router, RouterLink} from '@angular/router';
import {ClientModel} from '../models/clientModel';
import {SelectedClientService} from '../services/selected-client-service';
import {SellerModel} from '../models/sellerModel';
import {SaleRequestModel} from '../models/SaleRequestModel';
import { NgSelectModule } from '@ng-select/ng-select';
import {SelectedSellerService} from '../services/selected-seller-service';

@Component({
  selector: 'app-sell',
  imports: [
    NgSelectModule,
    FormsModule,
  ],
  templateUrl: './sell.html',
  styleUrl: './sell.css',
  encapsulation: ViewEncapsulation.None
})
export class Sell implements OnInit {

  constructor(private salesService: SalesService, private selectedClientService: SelectedClientService, private selectedSellerService: SelectedSellerService, private router: Router) { }


  /** Variales to Disable options that corresponds to placeholder */

  isSelectClientDisabled = false;
  isSelectProductDisabled = false;
  isSelectSellerDisabled = false;

  clients: ClientModel[] = [];
  sellers: SellerModel[] = [];

  selectedClient?: number;
  selectedSeller?: number;

  ngOnInit() {

    this.selectedClient = undefined;
    this.selectedSeller = undefined;


    this.salesService.getAllClients().subscribe({
      next: data => {
        this.clients = data;
      },
      error: error => {
        console.log('There was an error getting clients');
        console.log(error);
      }
    });

    this.salesService.getAllSellers().subscribe({
      next: data => {
        this.sellers = data;
      },
      error: error => {
        console.log('There was an error getting sellers');
        console.log(error);
      }
    })

    this.selectedClientService.getClient().subscribe((client) => {
      if (client) {
        this.selectedClient = client.id!
      }
    });

    this.selectedSellerService.getSeller().subscribe((seller) => {
      if (seller) {
        this.selectedSeller = seller.id!
      }
    })
  }

  postSale(){

    if(this.selectedClient === 0 || this.selectedSeller === 0 || !this.selectedClient || !this.selectedSeller) {
      alert("Please complete all the fields");
      return;
    }

    // FIXME

    const sale: SaleRequestModel | any = {
      clientId: this.selectedClient,
      sellerId: this.selectedSeller

    }

    let savedSale: Sales | null = null

    this.salesService.postSale(sale).subscribe({
      next: data => {
        savedSale = data;
        if(savedSale){
          alert("Sale saved successfully");
          this.selectedClientService.clear();
          this.selectedSellerService.clear();
          this.router.navigate(['sales']);
        }
        else{
          alert("There was an error saving sale");
        }
      },
      error: error => {
        console.log('There was an error posting sale');
        console.log(error);
      }
    })
  }


  disableSelectClient(){
    this.isSelectClientDisabled = true;
  }

  disableSelectProduct(){
    this.isSelectProductDisabled = true;
  }

  disableSelectSeller(){
    this.isSelectSellerDisabled = true;
  }

  createClient(){
    this.router.navigate(['create-client']);
  }

  createSeller(){
    this.router.navigate(['create-seller']);
  }

  openDetailsMenu(){
    this.router.navigate(['add-detail']);
  }
}

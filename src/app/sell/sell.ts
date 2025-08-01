import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SalesService} from '../services/sales.service';
import {Sales} from '../models/salesModel'
import {Router} from '@angular/router';
import {ClientModel} from '../models/clientModel';
import {SelectedClientService} from '../services/selected-client-service';
import {SellerModel} from '../models/sellerModel';
import {SaleRequestModel} from '../models/SaleRequestModel';

@Component({
  selector: 'app-sell',
  imports: [
    FormsModule
  ],
  templateUrl: './sell.html',
  styleUrl: './sell.css'
})
export class Sell implements OnInit {

  constructor(private salesService: SalesService, private selectedClientService: SelectedClientService, private router: Router) { }


  /** Variales to Disable options that corresponds to placeholder */

  isSelectClientDisabled = false;
  isSelectProductDisabled = false;
  isSelectSellerDisabled = false;

  products: string[] = [];
  clients: ClientModel[] = [];
  sellers: SellerModel[] = [];

  selectedProduct: string = "";
  selectedClient: number = 0;
  selectedSeller: number = 0;

  ngOnInit() {
    this.salesService.getAllProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: error => {
        console.log('There was an error getting products');
        console.log(error);
      }
    });

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
  }

  postSale(){

    if(this.selectedProduct === "" || this.selectedClient === 0 || this.selectedSeller === 0){
      alert("Please complete all the fields");
      return;
    }

    const sale: SaleRequestModel = {
      product: this.selectedProduct,
      clientId: this.selectedClient,
      sellerId: this.selectedSeller
    }

    let savedSale: Sales | null = null

    this.salesService.postSale(sale).subscribe({
      next: data => {
        savedSale = data;
        if(savedSale){
          alert("Sale saved successfully");
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
}

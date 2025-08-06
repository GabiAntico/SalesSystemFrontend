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
import {SaleDetailRequestModel} from '../models/saleDetailRequestModel';
import {DetailsListService} from '../services/details-list.service';
import {ProductsService} from '../services/products.service';
import {Product} from '../models/productModel';
import {BehaviorSubject} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sell',
  imports: [
    NgSelectModule,
    FormsModule,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './sell.html',
  styleUrl: './sell.css',
  encapsulation: ViewEncapsulation.None
})
export class Sell implements OnInit {

  constructor(private salesService: SalesService, private selectedClientService: SelectedClientService, private selectedSellerService: SelectedSellerService, private detailsService: DetailsListService, private productService: ProductsService, private router: Router) { }


  /** Variales to Disable options that corresponds to placeholder */

  isSelectClientDisabled = false;
  isSelectProductDisabled = false;
  isSelectSellerDisabled = false;

  clients: ClientModel[] = [];
  sellers: SellerModel[] = [];

  details: SaleDetailRequestModel[] = []

  selectedClient?: number;
  selectedSeller?: number;

  productMap$ = new BehaviorSubject<{ [key: number]: Product }>({});

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
    });

    this.detailsService.getDetails().subscribe((details) => {
      if(details && details.length > 0) {
        this.details = details;
        this.details.forEach(detail => {
          this.findProductById(detail.productId);
        });
      }
    });
  }

  postSale(){

    if(this.selectedClient === 0 || this.selectedSeller === 0 || !this.selectedClient || !this.selectedSeller
    || !this.details || this.details.length === 0) {
      alert("Please complete all the fields");
      return;
    }

    const sale: SaleRequestModel = {
      clientId: this.selectedClient,
      sellerId: this.selectedSeller,
      details: this.details
    }

    let savedSale: Sales | null = null

    this.salesService.postSale(sale).subscribe({
      next: data => {
        savedSale = data;
        if(savedSale){

          Swal.fire({
            title: 'Sale saved',
            text: "Your sale has been saved successfully!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          });

          this.selectedClientService.clear();
          this.selectedSellerService.clear();
          this.detailsService.clear();
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

  setClient(){
    if(this.selectedClient){
      const client: ClientModel | undefined = this.clients.find(x => x.id === this.selectedClient);

      if(client){
        this.selectedClientService.setClient(client);
      }

    }

  }
  setSeller(){
    if(this.selectedSeller){
      const seller: SellerModel | undefined = this.sellers.find(x => x.id === this.selectedSeller);

      if(seller){
        this.selectedSellerService.setSeller(seller);
      }
    }
  }

  findProductById(id: number){
    const currentMap = this.productMap$.getValue();

    if (!currentMap[id]) {
      this.productService.getProductById(id).subscribe(product => {
        const updatedMap = { ...currentMap, [id]: product };
        this.productMap$.next(updatedMap); // Emitimos el nuevo valor
      });
    }
  }

  getProductName(id: number, map: { [key: number]: Product }): string {
    return map[id]?.description || 'Cargando...';
  }


}

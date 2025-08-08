import {Component, OnInit} from '@angular/core';
import {Product} from '../models/productModel';
import {ProductsService} from '../../services/products.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SaleDetailRequestModel} from '../models/saleDetailRequestModel';
import Swal from 'sweetalert2';
import {DetailsListService} from '../../services/details-list.service';
import {Router} from '@angular/router';
import {SaleDetailModelTransfer} from '../models/saleDetailModelTransfer';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-add-details',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './add-details.html',
  styleUrl: './add-details.css'
})
export class AddDetails implements OnInit {

  products: Product[] = [];

  selectedProduct?: Product;
  quantity?: number;
  subTotal: number = 0;

  productsNamesToRenderTable: string[] = [];

  details: SaleDetailModelTransfer[] = [];

  constructor(private productsService: ProductsService, private detailsService: DetailsListService, private router: Router) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        console.log("There was an error while getting products");
        console.log(err);
      }
    });
  }

  calculateSubtotal(){
    if(this.selectedProduct && this.quantity){
      this.subTotal = this.selectedProduct.unitaryPrice * this.quantity;
    }
    else{
      this.subTotal = 0;
    }
  }

  addDetail(){
    if(!this.selectedProduct || !this.quantity){
      Swal.fire({
        title: 'All fields are required.',
        text: "Your must to complete all the fields to add the detail!",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if(this.quantity <= 0){
      Swal.fire({
        title: "Incorrect quantity",
        text: "The quantity can't be lower or equal to 0.",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      return;
    }

    for(let i = 0; i < this.details.length; i++){
      if(this.selectedProduct!.id == this.details[i].product.id){
        Swal.fire({
          title: 'Product already added!.',
          text: "Your can't add a product that is already added!",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        return;
      }
    }

    const detail: SaleDetailModelTransfer = {
      id: undefined,
      product: this.selectedProduct!,
      cuantity: this.quantity!,
      price: this.selectedProduct!.unitaryPrice,
      subtotal: this.subTotal!
    }

    this.productsNamesToRenderTable.push(this.selectedProduct!.description)

    this.details.push(detail);
  }

  submitProducts(){
    if(this.details.length <= 0){
      Swal.fire({
        title: 'There are no products added!.',
        text: "Your can't save a sell without products.",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      return;
    }

    this.detailsService.setDetails(this.details);
    this.router.navigate(['/sell']);
  }

  cancelDetails(){
    this.router.navigate(['/sell']);
  }
}

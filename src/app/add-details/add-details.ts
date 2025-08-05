import {Component, OnInit} from '@angular/core';
import {Product} from '../models/productModel';
import {ProductsService} from '../services/products.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SaleDetailRequestModel} from '../models/saleDetailRequestModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-details',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-details.html',
  styleUrl: './add-details.css'
})
export class AddDetails implements OnInit {

  products: Product[] = [];

  selectedProduct?: Product;
  cuantity?: number;
  subTotal?: number;

  productsNamesToRenderTable: string[] = [];

  details: SaleDetailRequestModel[] = [];

  constructor(private productsService: ProductsService) { }

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
    if(this.selectedProduct && this.cuantity){
      this.subTotal = this.selectedProduct.unitaryPrice * this.cuantity;
    }
    else{
      this.subTotal = 0;
    }
  }

  addDetail(){
    if(!this.selectedProduct || !this.cuantity){
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

    for(let i = 0; i < this.details.length; i++){
      if(this.selectedProduct!.id == this.details[i].productId){
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

    const detail: SaleDetailRequestModel = {
      id: undefined,
      productId: this.selectedProduct!.id,
      cuantity: this.cuantity!,
      price: this.selectedProduct!.unitaryPrice,
      subtotal: this.subTotal!
    }

    this.productsNamesToRenderTable.push(this.selectedProduct!.description)

    this.details.push(detail);
  }
}

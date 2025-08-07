import {Product} from './productModel';

export interface SaleDetailModel {
  id: number;
  product: Product;
  cuantity: number;
  price: number;
  subtotal: number;
}

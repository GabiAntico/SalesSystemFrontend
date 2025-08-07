import {Product} from './productModel';

export interface SaleDetailModelTransfer {
  id?: number;
  product: Product;
  cuantity: number;
  price: number;
  subtotal: number;
}

import {SaleDetailRequestModel} from './saleDetailRequestModel';

export interface SaleRequestModel {
  product: string;
  clientId: number;
  sellerId: number;
  details: SaleDetailRequestModel[];
}

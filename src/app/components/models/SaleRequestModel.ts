import {SaleDetailRequestModel} from './saleDetailRequestModel';

export interface SaleRequestModel {
  clientId: number;
  sellerId: number;
  details: SaleDetailRequestModel[];
}

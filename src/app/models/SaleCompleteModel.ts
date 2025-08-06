import {SaleDetailModel} from './saleDetailModel';
import {ClientModel} from './clientModel';
import {SellerModel} from './sellerModel';


export interface SaleComplete {
  id: number;
  client: ClientModel;
  seller: SellerModel;
  details: SaleDetailModel[];
  total: number;
}

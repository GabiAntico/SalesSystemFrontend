import { Routes } from '@angular/router';
import {ListSales} from './components/list-sales/list-sales';
import {Sell} from './components/sell/sell';
import {NewClient} from './components/new-client/new-client';
import {NewSeller} from './components/new-seller/new-seller';
import {SaleDetail} from './components/sale-detail/sale-detail';
import {AddDetails} from './components/add-details/add-details';

export const routes: Routes = [
  {
    path: '', redirectTo: 'sales', pathMatch: 'full'
  },
  {
    path: 'sales', component: ListSales
  },
  {
    path: 'sell', component: Sell
  },
  {
    path: 'create-client', component: NewClient
  },
  {
    path: 'create-seller', component: NewSeller
  },
  {
    path: 'sale-detail/:id', component: SaleDetail
  },
  {
    path: 'add-detail', component: AddDetails
  }
];

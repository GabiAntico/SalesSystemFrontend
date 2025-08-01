import { Routes } from '@angular/router';
import {ListSales} from './list-sales/list-sales';
import {Sell} from './sell/sell';
import {NewClient} from './new-client/new-client';

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
  }
];

import {Component, OnInit} from '@angular/core';
import {SalesService} from '../services/sales.service';
import {Sales} from '../models/salesModel';
import {Filter} from '../filter/filter';

@Component({
  selector: 'app-list-sales',
  imports: [
    Filter
  ],
  templateUrl: './list-sales.html',
  styleUrl: './list-sales.css',
  standalone: true
})
export class ListSales implements OnInit {
  constructor(private salesService: SalesService) {
  }

  sales: Sales[] = [];

  ngOnInit() {
    this.salesService.getSalesByClient("").subscribe({
      next: data => {
        this.sales = data;
      },
      error: err => {
        console.log('There was a problem getting list sales');
        console.log(err);
      }
    })

    console.log(this.sales);
  }

  updateSales(sales: Sales[]) {
    this.sales = sales;
  }
}

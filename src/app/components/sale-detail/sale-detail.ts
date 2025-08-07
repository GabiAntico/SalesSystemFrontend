import {Component, OnInit} from '@angular/core';
import {SaleComplete} from '../models/SaleCompleteModel';
import {SalesService} from '../../services/sales.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-sale-detail',
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './sale-detail.html',
  styleUrl: './sale-detail.css'
})
export class SaleDetail implements OnInit {

  constructor(private saleService: SalesService, private route: ActivatedRoute, private router: Router) {
  }

  sale?: SaleComplete;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.saleService.getSaleCompleteById(id).subscribe({
      next: data => {
        this.sale = data;
      },
      error: err => {
        console.log("There was an error getting sale.");
        console.log(err);
      }
    });
  }
}

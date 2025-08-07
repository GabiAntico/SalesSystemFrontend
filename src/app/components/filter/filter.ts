import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SalesService} from '../../services/sales.service';
import {Sales} from '../models/salesModel';

@Component({
  selector: 'app-filter',
  imports: [
    FormsModule
  ],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {

  constructor(private saleService: SalesService) { }

  inputString: string = "";

  @Output() sales = new EventEmitter<Sales[]>();

  filterSales(){
    this.saleService.getSalesByClient(this.inputString).subscribe({
      next: data => {
        this.sales.emit(data);
      },
      error: error => {
        console.log('There was a problem gettin sales');
        console.log(error);
      }
    })
  }
}

import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {SelectedClientService} from './services/selected-client-service';
import {SelectedSellerService} from './services/selected-seller-service';
import {DetailsListService} from './services/details-list.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'TailwindAngular';

  constructor(private router: Router, private selectedClientService: SelectedClientService, private selectedSellerService: SelectedSellerService, private detailsService: DetailsListService) { }

  openSalesMenu(){
    this.selectedClientService.clear();
    this.selectedSellerService.clear();
    this.detailsService.clear();
    this.router.navigate(['sales']);
  }
  openSellMenu(){
    this.router.navigate(['sell']);
  }
}

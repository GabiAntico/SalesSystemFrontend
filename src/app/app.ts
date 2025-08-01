import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'TailwindAngular';

  constructor(private router: Router) { }

  openSalesMenu(){
    this.router.navigate(['sales']);
  }
  openSellMenu(){
    this.router.navigate(['sell']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FavService } from '../services/fav.service';
import { RegisterComponent } from '../register/register.component';
import { FavtableComponent } from '../favtable/favtable.component';
import { QuotetableComponent } from '../quotetable/quotetable.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public api: ApiService, public favServ: FavService) { }

  // data;

  // quote;

  // stockData;

  // quoteData;

  token;

  userId;

  newFavItem = {};

  // getResults() {
  //   this.api.apiCall(this.favServ.ticker)
  //   .subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       this.data = response;
  //   });
  // }

  // getQuote() {
  //   this.api.quoteCall(this.favServ.ticker)
  //   .subscribe(
  //     (response: any) => {
  //       this.quote = response;
  //       console.log(this.quote)
  //       console.log(this.quote['Global Quote'])
  //       console.log(Object.values(this.quote['Global Quote']))
  //       this.quoteData = Object.values(this.quote['Global Quote'])
  //     }
  //   )
  // }

  objTest() {
    console.log(this.favServ.getFavData(this.userId, this.token));
    console.log(this.favServ.createFavList(this.userId, this.token));
    this.favServ.getFavData(this.userId, this.token)
    .subscribe(
      response => {
        console.log(response);
      }
    );
  }

  newFav() {
    this.newFavItem = {
      name: 'Placeholder',
      ticker: this.favServ.ticker.toUpperCase(),
      userId: this.userId
    }

    this.favServ.addFav(this.userId, this.token, this.newFavItem);

  }


  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.favServ.createFavList(this.userId, this.token);
  }
}






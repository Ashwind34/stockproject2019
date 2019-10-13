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

  quote;

  // stockData;

  quoteData;

  token;

  userId;

  newFavItem = {};

  // array of objects from getFav().subscribe
  rawFavData: any[];

  // list of unique tickers only, UPDATE LATER TO INCLUDE COMPANY NAME
  favList: string[] = [];

  favError: string = '';

  ticker: string = '';

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
    console.log(this.createFavList(this.userId, this.token));
    this.favServ.getFavData(this.userId, this.token)
    .subscribe(
      response => {
        console.log(response);
      }
    );
  }

  newFav() {
    this.newFavItem = {
      //NEED TO UPDATE THIS WITH COMPANY NAME INFO LATER
      name: 'Placeholder',
      ticker: this.ticker.toUpperCase(),
      userId: this.userId
    }

    this.addFav(this.userId, this.token, this.newFavItem);

  }

    // method to establish current user favorites list
  createFavList(id, token) {
    this.favServ.getFavData(id, token)
      .subscribe((response: any) => {
        this.rawFavData = response;
        console.log(response)
        console.log(this.rawFavData)
        this.rawFavData.forEach(element => {
          this.favList.push(element.ticker);
        });
        console.log(this.favList)
        this.favList = this.favServ.uniqueFav(this.favList)
      });
  }

  // method to add a new favorite to the list and return the updated list
  addFav(id, token, fav) {
    const unique = this.favServ.checkUniqueFav(this.favList, fav.ticker);
    if (unique) {
      this.favError = null;
      this.favServ.addNewFav(id, token, fav)
        .subscribe(
          (response: any) => {
            this.createFavList(id, token)
          }
        );
    } else {
      this.favError = 'That stock is already in your favorites!';
    }
  }

  getQuote(ticker) {
    console.log(ticker);
    this.api.quoteCall(ticker)
    .subscribe(
      (response: any) => {
        this.quote = response;
        console.log(this.quote)
        console.log(this.quote['Global Quote'])
        console.log(Object.values(this.quote['Global Quote']))
        this.quoteData = Object.values(this.quote['Global Quote'])
      }
    )
  }


  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.createFavList(this.userId, this.token);
  }
}






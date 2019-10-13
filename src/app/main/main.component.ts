import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FavService } from '../services/fav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  data;

  quote;

  quoteData;

  token;

  userId;

  newFavItem = {};

  // array of objects from getFav().subscribe
  rawFavData: any[];

  // list of unique tickers only, UPDATE LATER TO INCLUDE COMPANY NAME
  favList;

  favError: string = '';

  ticker: string = '';

  constructor(public api: ApiService, public favServ: FavService) { }

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
        this.favList = response;
        console.log(this.favList);
        // this.rawFavData.forEach(element => {
        //   this.favList.push(element.ticker);
        });
        // this.favList = this.uniqueFav(this.favList)
        this.favList = new Set(this.favList);
  }

  // method to add a new favorite to the list and return the updated list
  addFav(id, token, fav) {
    const unique = this.checkUniqueFav(this.favList, fav.ticker);
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

    // helper method to return an array without any duplicate entries
    uniqueFav(array) {
      return array.filter((element, index) => array.indexOf(element) === index);
    }

    // helper method to check if a ticker is already in the user favorites list
    checkUniqueFav(array, ticker) {
      return array.includes(ticker) ? false : true;
    }

  getQuote(tickerData) {
    let ticker = this.ticker;
    if (tickerData.id) {
      ticker = tickerData.ticker;
    }
    this.api.quoteCall(ticker)
    .subscribe(
      (response: any) => {
        this.quote = response;
        this.quoteData = Object.values(this.quote['Global Quote'])
      }
    )
  }

  getResults(ticker) {
    this.api.apiCall(ticker)
    .subscribe(
      (response: any) => {
        console.log(response);
        this.data = response;
    });
  }


  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.createFavList(this.userId, this.token);
  }
}






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

  quoteData = Array(10).fill('------');

  token: string;

  userId: string;

  newFavItem = {};

  favList = [];

  favListTickers: string[];

  favListIds: string[];

  favError: string;

  quoteError: string;

  ticker: string = '';

  constructor(public api: ApiService, public favServ: FavService) { }

  // method to establish current user favorites list
  createFavList(changed = '') {
    if (this.token) {
      this.favServ.getFavData(this.userId, this.token)
      .subscribe((response: any) => {
        if (response.length > 0) {
          this.favList = response;
        } else {
          this.favList = [{ticker: 'Add stocks to your favorites!'}];
        }
      });
    } else {
      this.favList = [{ticker: 'Login to see your favorites!'}];
    }
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

  // method to add a new favorite to the list and return the updated list
  addFav(id, token, fav) {
    const tickerInFavList = this.checkUniqueFav(this.favList, fav.ticker);
    if (!tickerInFavList) {
      this.favError = null;
      this.favServ.addNewFav(id, token, fav)
        .subscribe(
          (response: any) => {
            this.createFavList()
            this.ticker = '';
          }
        );
    } else {
      this.favError = 'That stock is already in your favorites!';
      this.ticker = '';
    }
  }

  // helper method to check if a ticker is already in the user favorites list
  checkUniqueFav(array, ticker) {
    return array.some(stock => stock.ticker === ticker);
  }

  getQuote(tickerData) {
    this.quoteError = null;
    let ticker = this.ticker;
    if (tickerData.id) {
      ticker = tickerData.ticker;
    }
    this.api.quoteCall(ticker)
    .subscribe(
      (response: any) => {
        this.quote = response;
        if (this.quote['Global Quote']) {
          this.quoteData = Object.values(this.quote['Global Quote'])
        } else {
          this.quoteError = "Ticker Invalid.  Please use a valid stock ticker."
        }
      }
    )
  }

  getResults(ticker) {
    this.api.apiCall(ticker)
    .subscribe(
      (response: any) => {
        this.data = response;
    });
  }

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.createFavList();
  }
}






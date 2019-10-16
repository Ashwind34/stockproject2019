import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FavService } from '../services/fav.service';
import { takeWhile, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  quote: any;
  quoteData = Array(10).fill('------');
  token: string;
  userId: string;
  newFavItem = {};
  favList = [];
  favListTickers: string[];
  favListIds: string[];
  quoteError: string;
  ticker: string = '';
  apiCallsErrorMessage: string = 'if you would like to target a higher API call frequency';

  constructor(public api: ApiService, public favServ: FavService) { }

  // method to establish current user favorites list
  createFavList(event = '') {
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

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.createFavList();
  }

  newFav() {
    this.newFavItem = {
      ticker: this.ticker.toUpperCase(),
      userId: this.userId
    }
    this.addFav(this.userId, this.token, this.newFavItem);
  }

  // method to add a new favorite to the list and update the list
  addFav(id, token, fav) {
    const tickerInFavList = this.checkUniqueFav(this.favList, fav.ticker);
    if (!tickerInFavList) {
      this.api.quoteCall(fav.ticker).pipe(
        takeWhile(quoteRes => {
          if (quoteRes['Error Message']) {
            this.quoteError = "Ticker Invalid.  Please use a valid stock symbol.";
            return false;
          }
          return true;
        }),
        mergeMap(() => this.favServ.addNewFav(id, token, fav))
      ).subscribe(() => {
        this.createFavList();
        this.ticker = '';
      });
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
          this.quoteData = Object.values(this.quote['Global Quote']);
        } else if (Object.values(this.quote).join().includes(this.apiCallsErrorMessage)){
          this.quoteError = "Our API request limit is 5 per minute. Please wait and try again.";
        } else {
          this.quoteError = "Ticker Invalid.  Please use a valid stock symbol.";
        }
      }
    )
  }
}






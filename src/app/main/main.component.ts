import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FavService } from '../services/fav.service';
import { empty } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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
  errorMessage: string;
  saveMessage: string;
  ticker: string = '';
  apiCallsErrorMessage: string = 'if you would like to target a higher API call frequency';

  constructor(public api: ApiService, public favServ: FavService) { }

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.createFavList();
  }

  // method to establish current user favorites list
  createFavList() {
    this.clearMessages();
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

  // method to add new favorites to. includes checks to make sure ticker is not
  // in existing list and checks to make sure ticker is available from api

  addFav() {
    this.clearMessages();
    const newFav = {
      ticker: this.ticker.toUpperCase(),
      userId: this.userId
    }

    const tickerInFavList = this.favList.some(stock => stock.ticker === newFav.ticker);

  // only add newFav object to user favorites if no error when retrieving quote data
    if (!tickerInFavList) {
      this.api.quoteCall(newFav.ticker).pipe(
        mergeMap((response) => {
          if (response['Error Message']) {
            this.errorMessage = "Ticker Invalid.  Please use a valid ticker symbol.";
            return empty();
          } else {
            return this.favServ.addNewFav(this.userId, this.token, newFav);
          }
        })).subscribe(() => {
          this.createFavList();
          this.ticker = null;
          this.saveMessage = "Stock saved to favorites!";
        });
    } else {
      this.errorMessage = "That stock is already in your favorites list!";
    }
  }

  // method to get stock data.  messy error handling because api does not return an http error
  // on bad requests, returns 200 with object that has error message properties

  getQuote(tickerData) {
    this.clearMessages();
    let ticker = this.ticker;
    if (tickerData.id) {
      ticker = tickerData.ticker;
      this.ticker = null;
    }
    this.api.quoteCall(ticker)
    .subscribe(
      (response: any) => {
        this.quote = response;
        if (this.quote['Global Quote']) {
          this.quoteData = Object.values(this.quote['Global Quote']);
        } else if (Object.values(this.quote).join().includes(this.apiCallsErrorMessage)){
          this.errorMessage = "Our API request limit is 5 per minute. Please wait and try again.";
        } else {
          this.errorMessage = "Ticker Invalid.  Please use a valid ticker symbol.";
        }
      }
    )
  }

  clearMessages() {
    this.errorMessage = null;
    this.saveMessage = null;
  }
}






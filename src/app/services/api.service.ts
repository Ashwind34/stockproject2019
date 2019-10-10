import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(public http: HttpClient) { }
  
  key: string = 'E6BYVBYEDEBLOQJI';
  
  baseUrl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=FULL&'

  quoteUrl: string = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&'

  data;

  quote;

  stockData;

  quoteData;

  // api call for time series data
  // NEED TO FIND OUT HOW TO ACCESS COMPANY NAME
  // CONSIDER ADDING SEARCH FUNCTIONALITY

  apiCall(ticker) {
      return this.http.get(
        this.baseUrl +
        'symbol=' + ticker +
        '&apikey=' + this.key
      )
  }

  quoteCall(ticker) {
    return this.http.get(
      this.quoteUrl +
      'symbol=' + ticker +
      '&apikey=' + this.key
    )
  }

  getResults(ticker) {
    this.apiCall(ticker)
    .subscribe(
      (response: any) => {
        console.log(response);
        this.data = response;
    });
  }

  getQuote(ticker) {
    this.quoteCall(ticker)
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

}

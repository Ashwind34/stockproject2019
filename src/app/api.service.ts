import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(public http: HttpClient) { }
  
  key: string = 'E6BYVBYEDEBLOQJI';
  
  baseUrl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=FULL&'

  apiCall(ticker) {
      return this.http.get(
        this.baseUrl +
        'symbol=' + ticker +
        '&apikey=' + this.key
      )
  }

}
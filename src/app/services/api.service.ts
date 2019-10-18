import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(public http: HttpClient) { }

  key: string = 'E6BYVBYEDEBLOQJI';

  quoteUrl: string = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&';

  quoteCall(ticker) {
    return this.http.get(
      this.quoteUrl +
      'symbol=' + ticker +
      '&apikey=' + this.key
    );
  }
}

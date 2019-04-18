import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(public http: HttpClient) { }
  
  key: string = 'E6BYVBYEDEBLOQJI';
  
  baseUrl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=FULL&'

  userUrl: string = 'http://localhost:3000/api/appUsers'

  userId: string = '5cb5458bc68a8600630cf698'

  apiCall(ticker) {
      return this.http.get(
        this.baseUrl +
        'symbol=' + ticker +
        '&apikey=' + this.key
      )
  }

  //tests for api/DB, can delete later

  userCall() {
    return this.http.get(
      this.userUrl + this.userId
    )
  }

  userPost(userData) {
    return this.http.post(this.userUrl, userData)
  }

  userLogin(userData) {
    return this.http.post(
      this.userUrl + '/login/', userData
    )
  }

}

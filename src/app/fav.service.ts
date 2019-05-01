import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  favUrl: string = 'http://localhost:3000/api/appUsers/'

  favQuery: string = '/userFavs?access_token='

  // array of objects from getFav().subscribe
  rawFavData;

  // list of unique tickers only, UPDATE LATER TO INCLUDE COMPANY NAME
  favList = [];

  favError;

  constructor(public http: HttpClient) { }

  getFavData(id, token) {
    return this.http.get(this.favUrl + id + this.favQuery + token);
  }

  uniqueFav(array) {
    return array.filter((element, index) => array.indexOf(element) === index);
  }

  createFavList(id, token) {
    this.getFavData(id, token)
    .subscribe(
      (response: any) => {
        this.rawFavData = response;
        this.rawFavData.forEach(element => {
          this.favList.push(element.ticker);
        });
        this.favList = this.uniqueFav(this.favList)
      });
  }

  checkUniqueFav(array, ticker) {
    if (array.includes(ticker)) {
      return false;
    } else {
      return true;
    }
  }

  addFav(id, token, fav) {
    const unique = this.checkUniqueFav(this.favList, fav.ticker);
    if (unique) {
      this.favError = '';
      return this.http.post(this.favUrl + id + this.favQuery + token, fav)
        .subscribe(
          (response: any) => {
            this.createFavList(id, token)
          }
        );
    } else {
      this.favError = 'That stock is already in your favorites!';
    }
  }
}

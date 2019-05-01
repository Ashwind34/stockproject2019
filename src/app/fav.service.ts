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
  favList =[];

  constructor(public http: HttpClient) { }

  checkUniqueFav(array, ticker) {
    if (array.includes(ticker)) {
      return false;
    } else {
      return true;
    }
  }

  uniqueFav(array) {
    return array.filter((element, index) => array.indexOf(element) === index);
  }

  getFavData(id, token) {
    return this.http.get(this.favUrl + id + this.favQuery + token);
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

  // addFav(id, token, fav, list) {
  //   let unique = this.checkUniqueFav(list, fav.ticker)
  //   if (unique) {
  //     return this.http.post(this.favUrl + id + this.favQuery + token, fav);
  //   }
  // }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(public http: HttpClient) { }

  favUrl: string = 'http://localhost:3000/api/appUsers/'
  favQuery: string = '/userFavs?access_token='

  addUniqueFav(array, ticker) {
    if (array.includes(ticker)) {
      return array;
    } else {
      array.push(ticker);
      return array;
    }
  }

  checkUniqueFav(array) {
    let uniqueArray = Array.from(new Set(array))
    return uniqueArray;
  }

  addFav(id, token, fav) {
    return this.http.post(this.favUrl + id + this.favQuery + token, fav);
  }

  getFavData(id, token) {
    return this.http.get(this.favUrl + id + this.favQuery + token);
  }

  createFavList(id, token) {
    this.getFavData(id, token)
    .subscribe(
      (response: any) => {
        response.forEach(element => {
          let array = [];
          array.push(element.ticker)
          return this.checkUniqueFav(array)
        });
      }
    )
  }
}


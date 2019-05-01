import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(public http: HttpClient) { }

  favUrl: string = 'http://localhost:3000/api/appUsers/'
  favQuery: string = '/userFavs?access_token='
  
  checkUniqueFav(array, ticker) {
    if (array.includes(ticker)) {
      return false;
    } else {
      return true;
    }
  }

  uniqueFav(array) {
    let uniqueArray = Array.from(new Set(array))
    return uniqueArray;
  }

  getFavData(id, token) {
    return this.http.get(this.favUrl + id + this.favQuery + token);
  }

  createFavList(id, token) {
    this.getFavData(id, token)
    .subscribe(
      (response: any) => {
        let array = []
        response.forEach(element => {
          array.push(element.ticker)
        });
        console.log(array)
        console.log(this.uniqueFav(array))
        return this.uniqueFav(array)
      }
    )
  }

  addFav(id, token, fav, list) {
    let unique = this.checkUniqueFav(list, fav.ticker)
    if (unique) {
      return this.http.post(this.favUrl + id + this.favQuery + token, fav);
    }
  }
}

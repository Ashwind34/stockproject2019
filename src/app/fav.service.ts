import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(public http: HttpClient) { }

  favUrl: string = 'http://localhost:3000/api/appUsers/'
  favQuery: string = '/userFavs?access_token='

  createFav(id, token, fav) {
    return this.http.post(this.favUrl + id + this.favQuery + token, fav);
  }

  getFav(id, token) {
    return this.http.get(this.favUrl + id + this.favQuery + token);
  }

  updateFav(id, token, list) {
    this.getFav(id, token)
    .subscribe(
      (response: any) => {
        response.forEach(element => {
          list.push(element.ticker)
        });
      }
    )
  }
}

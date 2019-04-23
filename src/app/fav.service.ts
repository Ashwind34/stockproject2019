import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(public http: HttpClient) { }

  favUrl: string = 'http://localhost:3000/api/appUsers/'
  favQuery: string = '/userFavs?access_token='
  favList = []

  createFav(id, token, fav) {
    return this.http.post(this.favUrl + id + this.favQuery + token, fav);
  }

  getFav(id, token) {
    return this.http.get(this.favUrl + id + this.favQuery + token);
  }

  updateFav(id, token) {
    this.getFav(id, token)
    .subscribe(
      (response: any) => {
        console.log(response)
        response.forEach(element => {
          this.favList.push(element.ticker)
        });
      }
    )
  }



}

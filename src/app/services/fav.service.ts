import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  favUrl: string = 'http://localhost:3000/api/appUsers'

  favQuery: string = 'userFavs?access_token='

  constructor(public http: HttpClient) { }

  // get raw data on user favorites.  returns array of objects
  getFavData(id, token) {
    return this.http.get(`${this.favUrl}/${id}/${this.favQuery}${token}`);
  }

  addNewFav(id, token, fav) {
    return this.http.post(`${this.favUrl}/${id}/${this.favQuery}${token}`, fav);
  }
}

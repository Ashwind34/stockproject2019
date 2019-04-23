import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FavService } from '../fav.service';
import { RegisterComponent } from '../register/register.component';
import { FavtableComponent } from '../favtable/favtable.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public api: ApiService, public favServ: FavService) { }
  
  data;

  stockData;

  ticker;

  token;

  userId;

  newFavItem = {};

  favList = [];

  getResults() {
    this.api.apiCall(this.ticker)
    .subscribe(
    (response: any) => {
      console.log(response);
      this.data = response;
    });
  }

  objTest() {
    console.log(this.data['Time Series (Daily)']);
  }

  newFav() {
    this.newFavItem = {
      name: 'Microsoft',
      ticker: this.ticker.toUpperCase(),
      userId: this.userId
    }
    this.favList = []
    this.favServ.createFav(this.userId, this.token, this.newFavItem)
    .subscribe(
      (response: any) => {
        console.log(response)
        this.favServ.updateFav(this.userId, this.token, this.favList)
      }
    )
  }

  ngOnInit() {
    this.favList = []
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.favServ.updateFav(this.userId, this.token, this.favList);
  }
}






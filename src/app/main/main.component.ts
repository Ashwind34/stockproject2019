import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FavService } from '../services/fav.service';
import { RegisterComponent } from '../register/register.component';
import { FavtableComponent } from '../favtable/favtable.component';
import { QuotetableComponent } from '../quotetable/quotetable.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public api: ApiService, public favServ: FavService) { }

  token;

  userId;

  newFavItem = {};

  objTest() {
    console.log(this.favServ.getFavData(this.userId, this.token));
    console.log(this.favServ.createFavList(this.userId, this.token));
    this.favServ.getFavData(this.userId, this.token)
    .subscribe(
      response => {
        console.log(response);
      }
    );
  }

  newFav() {
    this.newFavItem = {
      name: 'Placeholder',
      ticker: this.favServ.ticker.toUpperCase(),
      userId: this.userId
    }

    this.favServ.addFav(this.userId, this.token, this.newFavItem);

  }


  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.favServ.createFavList(this.userId, this.token);
  }
}






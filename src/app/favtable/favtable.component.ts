import { Component, OnInit } from '@angular/core';
import { FavService } from '../fav.service';

@Component({
  selector: 'app-favtable',
  templateUrl: './favtable.component.html',
  styleUrls: ['./favtable.component.scss']
})
export class FavtableComponent implements OnInit {

  constructor(public favServ: FavService) { }

  // favlist = ['AMZN', 'MSFT', 'AAPL', 'MCD' , 'BA', 'AMD', 'NVDA']

  favlist = []

  userId;

  token;

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.favServ.getFav(this.userId, this.token)
    .subscribe(
      (response:any) => {
        console.log(response)
        response.forEach(element => {
          this.favlist.push(element.ticker)
        });
      }
    )


  }

}

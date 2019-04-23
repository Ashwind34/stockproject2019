import { Component, OnInit, Input } from '@angular/core';
import { FavService } from '../fav.service';

@Component({
  selector: 'app-favtable',
  templateUrl: './favtable.component.html',
  styleUrls: ['./favtable.component.scss']
})
export class FavtableComponent implements OnInit {

  constructor(public favServ: FavService) { }

  @Input() favlist: any;

  // userId;

  // token;

  // ngOnChanges() {
  //   this.favServ.updateFav(this.userId, this.token)
  // }

  ngOnInit() {
    console.log(this.favlist)
    // this.favServ.favList = [];
    // this.token = sessionStorage.getItem('token');
    // this.userId = sessionStorage.getItem('userId');
    // this.favServ.updateFav(this.userId, this.token);
    // this.favServ.favList = [];
  }
}

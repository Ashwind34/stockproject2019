import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FavService } from '../services/fav.service';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-favtable',
  templateUrl: './favtable.component.html',
  styleUrls: ['./favtable.component.scss']
})
export class FavtableComponent implements OnInit {

  constructor(public favServ: FavService, public api: ApiService) { }

  @Input() favList: any;
  @Output() tickerChanged = new EventEmitter();
  @Output() tickerDeleted = new EventEmitter();

  trackTest(index: any, item: any) {
    return index;
  }

  changeTicker(i) {
    this.tickerChanged.emit(this.favList[i]);
  }

  deleteTicker(i) {
    console.log(this.favList[i])
    this.favServ.deleteFav(this.favList[i].id)
    .subscribe(() => {
      this.tickerDeleted.emit('deleted')
    });
  }

  ngOnInit() {
  }
}

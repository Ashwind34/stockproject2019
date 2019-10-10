import { Component, OnInit, Input } from '@angular/core';
import { FavService } from '../services/fav.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-favtable',
  templateUrl: './favtable.component.html',
  styleUrls: ['./favtable.component.scss']
})
export class FavtableComponent implements OnInit {

  constructor(public favServ: FavService, public api: ApiService) { }

  @Input() favlist: any;

  trackTest(index: any, item: any) {
    return index;
  }

  changeTicker(ticker) {
    this.favServ.ticker = ticker;
    this.api.getQuote(this.favServ.ticker);
  }

  ngOnInit() {
  }
}

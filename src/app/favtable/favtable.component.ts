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

  trackTest(index: any, item: any) {
    return index;
  }

  changeTicker() {
    this.favServ.ticker = 'msft';
  }

  ngOnInit() {
  }
}

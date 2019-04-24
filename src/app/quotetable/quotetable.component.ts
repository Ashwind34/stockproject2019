import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quotetable',
  templateUrl: './quotetable.component.html',
  styleUrls: ['./quotetable.component.scss']
})
export class QuotetableComponent implements OnInit {

  constructor() { }

  @Input() quoteData: any;

  headers = ['Symbol', 'Price',  'Open',  'High',  'Low', 'Volume', 'Date', 'Prev. Close', 'Change ($)', 'Change (%)'];

  ngOnInit() {
  }

}

import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { headersToString } from 'selenium-webdriver/http';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-quotetable',
  templateUrl: './quotetable.component.html',
  styleUrls: ['./quotetable.component.scss']
})
export class QuotetableComponent implements OnInit, OnChanges {

  constructor(public api: ApiService) { }

  @Input() quoteData: any;

  headers = [
    'Symbol:',
    'Price:',
    'Open:',
    'High:',
    'Low:',
    'Volume:',
    'Date:',
    'Prev. Close:',
    'Change ($):',
    'Change (%):'
  ];

  fullData = [];

  createTableData() {
    this.fullData = [];
    for (let i = 0; i < this.headers.length; i++ ) {
      const item = {
        header: this.headers[i],
        data: this.quoteData[i]
      }
      this.fullData.push(item)
    }
  }

  ngOnChanges() {
    this.createTableData();
  }

  ngOnInit() {
  }

}

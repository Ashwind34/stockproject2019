import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favtable',
  templateUrl: './favtable.component.html',
  styleUrls: ['./favtable.component.scss']
})
export class FavtableComponent implements OnInit {

  constructor() { }

  favlist = ['AMZN', 'MSFT', 'AAPL', 'MCD' , 'BA', 'AMD', 'NVDA']

  ngOnInit() {
  }

}

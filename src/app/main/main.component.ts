import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public api: ApiService) { }
  data;
  ticker = '';

  getResults() {
    this.api.apiCall(this.ticker)
    .subscribe(
      (response: any) => {
        console.log(response);
        this.data = response;
      });
    }

  ngOnInit() {
  }

}
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
  userData: any =   
  {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password : ''
  }
  user;

  token;

  userId;

  getResults() {
    this.api.apiCall(this.ticker)
    .subscribe(
      (response: any) => {
        console.log(response);
        this.data = response;
      });
  }

  //tests for api/DB, can delete later

  getUser() {
    this.api.userCall()
    .subscribe(
      (response: any) => {
        console.log(response);
        this.data = response;
      }
    )
  }

  postUser() {
    this.api.userPost(this.userData)
    .subscribe(
      (response: any) => {
        console.log(response);
        this.user = response;
      }
    )
  }

  loginUser() {
    this.api.userLogin(this.userData)
    .subscribe(
      (response: any) => {
        console.log(response);
        this.user = response;
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userId', response.userId);
      }
    )
  }

  printUser() {

    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    console.log(this.token);
    console.log(this.userId);

  }
 
  ngOnInit() {
  }

}




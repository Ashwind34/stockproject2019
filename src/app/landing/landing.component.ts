import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, public userApi: UserService) { }

  title = 'Stock Info App PART DEUX';

  loginData: any =
  {
    email: '',
    password : ''
  };

  user;

  token;

  errorMessage;

  loginUser() {
    this.user = '';
    this.errorMessage = '';
    this.userApi.userLogin(this.loginData)
    .subscribe(
      (response: any) => {
        this.user = response;
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userId', response.userId);
      }, error => {
        this.errorMessage = error.status;
        console.log('Error Status Code: ' + this.errorMessage);
        console.log(error);
      }, () => {
          if (!this.errorMessage) {
            this.router.navigate(['/main']);
          }
      }
    );
  }

  toRegister() {
    this.router.navigate(['/register']);

  }

  ngOnInit() {
    this.token = sessionStorage.getItem('token')
  }

}

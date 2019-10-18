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

  token;

  errorMessage;

  loginUser() {
    this.errorMessage = null;
    this.userApi.userLogin(this.loginData)
    .subscribe(
      (response: any) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userId', response.userId);
      }, error => {
        this.errorMessage = error.status;
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

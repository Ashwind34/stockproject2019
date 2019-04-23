import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public userApi: UserService) { }

  userData: any =
  {
    firstName: '',
    lastName: '',
    email: '',
    password : ''
  };

  user;

  registerUser() {
    this.userApi.userRegister(this.userData)
    .subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user);
      }
    );
  }

  loginUser() {
    this.userApi.userLogin(this.userData)
    .subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userId', response.userId);
      }
    );
  }

  ngOnInit() {
  }

}

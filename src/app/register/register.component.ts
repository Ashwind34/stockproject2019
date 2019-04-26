import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, public userApi: UserService) { }

  userData: any =
  {
    firstName: '',
    lastName: '',
    email: '',
    password : ''
  };

  user;

  errorMessage;

  registerUser() {
    this.user = '';
    this.errorMessage = '';
    this.userApi.userRegister(this.userData)
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

  ngOnInit() {
  }

}

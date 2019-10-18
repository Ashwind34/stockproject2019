import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
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

  errorDisplay;

  registerUser() {
    this.user = null;
    this.errorMessage = null;
    this.errorDisplay = null;
    this.userApi.userRegister(this.userData)
    .subscribe(
      (response: any) => {
        this.user = response;
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userId', response.userId);
      }, error => {
        this.errorMessage = error.error.error.message;
        if(this.errorMessage.includes('`email` is invalid')) {
          this.errorDisplay = "Invalid email address.  Please try again.";
        } else if (this.errorMessage.includes('Email already exists')) {
          this.errorDisplay = "Email already in use.  Please try again."
        } else {
          this.errorDisplay = "Error with Registration.  Please try again."
        }
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

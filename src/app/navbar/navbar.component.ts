import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // USE THIS PROPERTY TO DISPLAY USER NAME

  userData;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  logout() {
    const token = sessionStorage.getItem('token');
    console.log(token)
    this.userService.userLogout(token)
    .subscribe(() => {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('token');
    });
  }

  //NEED TO SET UP AUTHENTICATION FOR GET REQUESTS TO USE THIS
  getCurrentUser() {
    const id = sessionStorage.getItem('userId');
    this.userService.getUser(id)
    .subscribe((response) => {
      this.userData = response;
      console.log(this.userData)
    });
  }

}

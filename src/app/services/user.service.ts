import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  userUrl: string = 'http://localhost:3000/api/appUsers'

  // api calls to interact with backend

  userRegister(userData) {
    return this.http.post(this.userUrl, userData)
  }

  userLogin(userData) {
    return this.http.post(
      this.userUrl + '/login/', userData
    )
  }

  userLogout(token) {
    return this.http.post(`${this.userUrl}/logout?access_token=${token}`)
  }

}

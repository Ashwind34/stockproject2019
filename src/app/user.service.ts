import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  userUrl: string = 'http://localhost:3000/api/appUsers'

  userId: string = '5cb5458bc68a8600630cf698'

  //tests for api/DB, can delete later

  userCall() {
    return this.http.get(
      this.userUrl + this.userId
    )
  }

  userPost(userData) {
    return this.http.post(this.userUrl, userData)
  }

  userLogin(userData) {
    return this.http.post(
      this.userUrl + '/login/', userData
    )
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  userUrl: string = 'https://stockquotesapi.herokuapp.com/api/appUsers';

  // api calls to interact with backend

  userRegister(userData) {
    return this.http.post(this.userUrl, userData);
  }

  userLogin(userData) {
    return this.http.post(this.userUrl + '/login/', userData);
  }

  userLogout(token) {
    return this.http.post(`${this.userUrl}/logout?access_token=${token}`, {});
  }

  getUser(id) {
    return this.http.get(`${this.userUrl}/${id}`);
  }

}

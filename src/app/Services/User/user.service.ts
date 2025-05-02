import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpService) {}

  register(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        //'Authorization':'token'
      }),
    };
    return this.httpService.postService(
      'http://localhost:5000/api/user',
      reqData,
      false,
      header
    );
  }

  login(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        //'Authorization':'token'
      }),
    };
    return this.httpService.postService(
      'http://localhost:5000/api/user/login',
      reqData,
      false,
      header
    );
  }

  adminRegister(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        //'Authorization':'token'
      }),
    };
    return this.httpService.postService(
      'http://localhost:5000/api/admin',
      reqData,
      false,
      header
    );
  }

  adminLogin(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        //'Authorization':'token'
      }),
    };
    return this.httpService.postService(
      'http://localhost:5000/api/admin/login',
      reqData,
      false,
      header
    );
  }
}

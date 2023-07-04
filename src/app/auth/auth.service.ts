import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe((res) => {
        console.log(res);
        const token = res.token;
        this.token = token;
      });
  }
}

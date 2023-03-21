import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  isLogin() {
    const tokenExist = localStorage.getItem('token');
    return tokenExist ? true : false;
  }

  logout() {
    localStorage.clear();
  }
}

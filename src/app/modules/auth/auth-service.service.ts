import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login() {
    if (localStorage.getItem('Login')) {
      return true;
    }
  }
}

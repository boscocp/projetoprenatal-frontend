import { Injectable } from '@angular/core';

const EMAIL = 'email';
const USER = 'userName';
const TIPO = 'tipo';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  hasToken() {
    return !!this.getToken();
  }

  setToken(email: string, username: string, tipo:string) {
    window.localStorage.setItem(EMAIL, email);
    window.localStorage.setItem(USER, username);
    window.localStorage.setItem(TIPO, tipo);
  }

  getToken() : string {
    return window.localStorage.getItem(EMAIL)!;
  }
  getUser(): string  {
    return window.localStorage.getItem(USER)!;
  }
  getTipo(): string  {
    return window.localStorage.getItem(TIPO)!;
  }

  removeToken() {
    window.localStorage.removeItem(EMAIL);
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(TIPO);
  }
}

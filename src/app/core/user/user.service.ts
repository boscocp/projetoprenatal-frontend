import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private nullUser: User = {};
  private userSubject = new BehaviorSubject<User>(this.nullUser);
  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }
  setToken(email: string, username: string, tipo: string) {
    this.tokenService.setToken(email, username, tipo);
    this.decodeAndNotify();
  }

  decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user: User = {
      email : this.tokenService.getToken(),
      userName : this.tokenService.getUser(),
      tipo : this.tokenService.getTipo(),
    };
    this.userSubject.next(user);
  }
  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(this.nullUser);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { tap } from 'rxjs/operators';

const API_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }

  authenticate(email: string, password: string) {
    return this.http.post(API_URL + '/user/login/',
     {email, password},
     {withCredentials: true}
    ).pipe(tap( (res : any) => {
      this.userService.setToken(res.email, res.userName, res.tipo);
    }));
  }
}

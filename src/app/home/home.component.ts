import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';
  authenticated = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );

    this.http.get('http://localhost:1024/user/person/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Olá ${res.name}`;
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'Por favor, faça o login ou registre-se =)';
        Emitters.authEmitter.emit(false);
      }
    );
  }

}

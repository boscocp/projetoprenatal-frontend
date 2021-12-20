import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Emitters } from '../emitters/emitters';
// import {Emitters} from '../emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:1024/user/person/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'Por favor, faça o login ou registre-se =)';
        Emitters.authEmitter.emit(false);
      }
    );
  }

}

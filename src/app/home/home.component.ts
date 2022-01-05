import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TokenService } from '../core/token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';
  authenticated: boolean = false;
  constructor(
    private tokenService: TokenService
    ) { }

  needReload() {
    window.location.reload();
  }

  ngOnInit(): void {
    if (this.tokenService.hasToken()) {
      this.authenticated = true;
      this.message = 'Olá '.concat(this.tokenService.getUser());
    } else {
      this.message = 'Por favor, faça o login ou registre-se =)';
    }
  }

}

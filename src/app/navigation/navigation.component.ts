import { AfterViewInit, Component, OnInit,} from '@angular/core';
import { TokenService } from '../core/token/token.service';
import { UserService } from '../core/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  authenticated = false;
  constructor(private tokeService: TokenService, private userService: UserService) { }

  ngOnInit(): void {
    this.authenticated = this.tokeService.hasToken();
  }
  logout(): void {
    this.authenticated = false;
    this.userService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth : boolean = false;
  user: Subscription = Subscription.EMPTY;


  constructor(private _AuthService:AuthService) {

   }

  ngOnInit(): void {
    this.user = this._AuthService.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }

  logout() {
    this._AuthService.logout();
  }

  ngOnDestroy() {
    this.user.unsubscribe();
  }

}

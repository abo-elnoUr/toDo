import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo';
  environment : string = '';
  constructor(private _AuthService:AuthService)
  {

  }
  ngOnInit()
  {
    this._AuthService.autoLogin();
    this.environment = environment.environment;
    console.log(this.environment);
  }
}

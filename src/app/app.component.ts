import { UserService } from './shared/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static title = 'Asky';

  constructor(private userService: UserService) {
    this.userService.autoLogin();
  }
}

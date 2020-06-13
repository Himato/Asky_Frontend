import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-outer',
  templateUrl: './outer.component.html',
  styleUrls: ['./outer.component.css']
})
export class OuterComponent {
  isRegister: boolean;

  constructor(private router: Router) {
    this.isRegister = this.router.url === '/register';
    this.router.events.subscribe((naviationEnd: NavigationEnd) => {
      this.isRegister = naviationEnd.url === '/register';
    });
  }

}

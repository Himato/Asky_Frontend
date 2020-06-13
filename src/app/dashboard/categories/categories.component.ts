import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  isMain: boolean;

  constructor(private router: Router) {
    this.isMain = this.router.url === '/dashboard/categories';
    this.router.events.subscribe((navigationEnd: NavigationEnd) => {
      this.isMain = navigationEnd.url === '/dashboard/categories';
    });
  }

}

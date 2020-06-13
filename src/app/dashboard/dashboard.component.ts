import { environment } from './../../environments/environment';
import { UserService } from './../shared/services/user.service';
import { AdminUser } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: AdminUser[];
  url = environment.baseUrl + 'Images/';
  fetching = true;
  id: number;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.queryParams.new;

    this.userService.getUsers().subscribe((users: AdminUser[]) => {
      this.users = users;
      this.fetching = false;
    }, () => {
      this.fetching = false;
    });
  }

}

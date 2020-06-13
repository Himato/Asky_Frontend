import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../shared/services/user.service';
import { environment } from './../../environments/environment';
import { ViewProfile, User } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: ViewProfile;
  fetching = true;
  url = environment.baseUrl + 'Images/';

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let username: string;

    if (this.router.url === '/profile') {
      this.userService.user.pipe(take(1)).subscribe((user: User) => {
        username = user.username;
      });
    } else {
      username = this.activatedRoute.snapshot.params.username;
    }

    if (!username) {
      this.router.navigate(['/notfound']);
    }

    this.userService.getUserProfile(username).subscribe((profile: ViewProfile) => {
      this.profile = profile;
      this.fetching = false;
    }, () => {
      this.router.navigate(['/']);
    });
  }

}

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
   boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.userService.user.pipe(
      take(1),
      map((user) => {
        if (!!user && user.role === 'admin') {
          return true;
        }
        return this.router.createUrlTree(['/notfound']);
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}

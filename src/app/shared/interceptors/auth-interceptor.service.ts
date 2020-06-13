import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.userService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}

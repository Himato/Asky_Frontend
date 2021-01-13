import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
let AuthInterceptorService = class AuthInterceptorService {
    constructor(userService) {
        this.userService = userService;
    }
    intercept(req, next) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            if (!user) {
                return next.handle(req);
            }
            const modifiedReq = req.clone({
                headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
            });
            return next.handle(modifiedReq);
        }));
    }
};
AuthInterceptorService = __decorate([
    Injectable({ providedIn: 'root' })
], AuthInterceptorService);
export { AuthInterceptorService };
//# sourceMappingURL=auth-interceptor.service.js.map
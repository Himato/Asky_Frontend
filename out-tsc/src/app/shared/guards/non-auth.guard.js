import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
let NonAuthGuard = class NonAuthGuard {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    canActivate(route, router) {
        return this.userService.user.pipe(take(1), map((user) => {
            const isAuth = !!user;
            if (!isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/']);
        })
        // tap(isAuth => {
        //   if (!isAuth) {
        //     this.router.navigate(['/auth']);
        //   }
        // })
        );
    }
};
NonAuthGuard = __decorate([
    Injectable({ providedIn: 'root' })
], NonAuthGuard);
export { NonAuthGuard };
//# sourceMappingURL=non-auth.guard.js.map